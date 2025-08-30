<template>
  <div class="vueflow-border">
    <VueFlow :nodes="nodes" :edges="edges" fit-view-on-init>
      <template #node-sentence="{ id, data }">
        <div class="sentence-node">
          <template v-if="data.sentence">
            <SentenceContainer :wordGroupList="data.sentence.sentenceWordGroupList" />
          </template>
          <template v-else>
            <template v-if="!availableTargetNodeIds.includes(Number(id))">
              <div class="not-created-card">未作成</div>
            </template>
          </template>
          <button
            v-if="availableTargetNodeIds.includes(Number(id))"
            class="start-btn"
            @click="handleStartExercise(Number(id), getParentTranslationId(Number(id)))"
          >
            作成する
          </button>
        </div>
      </template>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import '@vue-flow/core/dist/style.css'
import { computed, defineEmits } from 'vue'
import { VueFlow } from '@vue-flow/core'
import SentenceContainer from './SentenceContainer.vue'
import { useExerciseStore } from '@/stores/exercise'
import type { GraphNode, GraphLink } from '@/stores/exercise'

const emit = defineEmits(['start-exercise'])
const exerciseStore = useExerciseStore()

/**
 * グラフの木構造レイアウトを計算し、各ノードの座標・深さを返す関数。
 * @param nodeList ノード配列
 * @param linkList リンク配列
 * @returns nodeDepth, nodePos
 */
function calcTreeLayout(
  nodeList: GraphNode[],
  linkList: GraphLink[],
): { nodeDepth: Record<number, number>; nodePos: Record<number, { x: number; y: number }> } {
  // ...existing code...
  const parents: Record<number, number> = {}
  linkList.forEach((link: GraphLink) => {
    parents[link.targetNodeId] = link.sourceNodeId
  })
  const rootNodes = nodeList.filter((n) => !(n.nodeId in parents))
  const nodeDepth: Record<number, number> = {}
  function setDepth(nodeId: number, depth: number) {
    nodeDepth[nodeId] = depth
    linkList
      .filter((l) => l.sourceNodeId === nodeId)
      .forEach((l) => {
        setDepth(l.targetNodeId, depth + 1)
      })
  }
  rootNodes.forEach((root) => setDepth(root.nodeId, 0))
  const depthGroups: Record<number, number[]> = {}
  nodeList.forEach((n) => {
    const d = nodeDepth[n.nodeId] ?? 0
    if (!depthGroups[d]) depthGroups[d] = []
    depthGroups[d].push(n.nodeId)
  })
  const nodePos: Record<number, { x: number; y: number }> = {}
  const xGap = 1000,
    yGap = 180,
    yStart = 100
  Object.entries(depthGroups).forEach(([depthStr, ids]) => {
    const depth: number = parseInt(depthStr, 10)
    const nodeIds: number[] = ids as number[]
    const count: number = nodeIds.length
    const totalWidth: number = (count - 1) * xGap
    const xStart: number = 100 - totalWidth / 2
    nodeIds.forEach((nodeId: number, i: number) => {
      nodePos[nodeId] = {
        x: xStart + i * xGap,
        y: yStart + depth * yGap,
      }
    })
  })
  return { nodeDepth, nodePos }
}

/**
 * 指定ノードが「作成済み」かどうかを判定する関数。
 * ルートノードまたはisConnectedなリンクで到達できる場合true。
 * @param nodeId ノードID
 * @param nodeList ノード配列
 * @param linkList リンク配列
 * @returns 作成済みならtrue
 */
function isNodeCreated(nodeId: number, nodeList: GraphNode[], linkList: GraphLink[]): boolean {
  // ...existing code...
  if (nodeList.length === 0) return false
  const parents: Record<number, number> = {}
  linkList.forEach((link) => {
    parents[link.targetNodeId] = link.sourceNodeId
  })
  const rootNode = nodeList.find((n) => !(n.nodeId in parents))
  if (!rootNode) return false
  if (nodeId === rootNode.nodeId) return true
  const incomingLinks = linkList.filter((l) => l.targetNodeId === nodeId && l.isConnected)
  if (incomingLinks.length === 0) return false
  return incomingLinks.some((l) => isNodeCreated(l.sourceNodeId, nodeList, linkList))
}

/**
 * グラフ描画用のノード配列を返すcomputed。
 * 各ノードの座標・作成済み判定・sentenceデータを含む。
 */
const nodes = computed(() => {
  const { nodeList, linkList, translationModel } = exerciseStore
  if (!nodeList.length) return []
  const { nodePos } = calcTreeLayout(nodeList, linkList)
  return nodeList.map((node) => {
    const created = isNodeCreated(node.nodeId, nodeList, linkList)
    const sentence = created
      ? translationModel.find((s) => s.sentenceId === node.sentenceId)
      : undefined
    return {
      id: String(node.nodeId),
      type: 'sentence',
      position: nodePos[node.nodeId] || { x: 100, y: 100 },
      data: { sentence },
    }
  })
})

/**
 * グラフ描画用のエッジ配列を返すcomputed。
 * 各エッジの色・アニメーションも含む。
 */
const edges = computed(() =>
  exerciseStore.linkList.map((link) => ({
    id: String(link.linkId),
    source: String(link.sourceNodeId),
    target: String(link.targetNodeId),
    type: 'straight',
    animated: !link.isConnected,
    style: {
      stroke: link.isConnected ? '#43a047' : '#1976d2',
      strokeWidth: 2,
      opacity: link.isConnected ? 1 : 0.7,
    },
  })),
)

/**
 * 進行可能なリンクのtargetNodeIdリストを返すcomputed。
 */
const availableTargetNodeIds = computed(() =>
  exerciseStore.getAvailableLinks().map((link) => link.targetNodeId),
)

/**
 * 指定ノードの親ノードのtranslationIdを取得する関数。
 * @param nodeId ノードID
 * @returns 親ノードのtranslationId or null
 */
function getParentTranslationId(nodeId: number): number | null {
  const link = exerciseStore.linkList.find((l) => l.targetNodeId === nodeId)
  if (!link) return null
  const parentNode = exerciseStore.nodeList.find((n) => n.nodeId === link.sourceNodeId)
  return parentNode?.translationId ?? null
}

/**
 * 「作成する」ボタン押下時に呼ばれる関数。
 * 対応するリンクをstoreに渡し、演習タブに切り替えをemitする。
 * @param nodeId ノードID
 * @param parentTranslationId 親ノードのtranslationId
 */
async function handleStartExercise(nodeId: number, parentTranslationId: number | null) {
  const link = exerciseStore.linkList.find((l) => l.targetNodeId === nodeId && !l.isConnected)
  if (link) {
    await exerciseStore.startExerciseByLink(link.linkId, parentTranslationId)
    emit('start-exercise')
  }
}
</script>

<style scoped>
.vueflow-border {
  height: 80vh !important;
  min-height: 400px;
  width: 100%;
  border: 2px solid #1976d2;
  border-radius: 8px;
  background: #f5f7fa;
  box-sizing: border-box;
  margin-top: 16px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
}

.sentence-node {
  min-width: 220px;
  min-height: 60px;
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-direction: column;
  gap: 8px;
}

.start-btn {
  margin-top: 8px;
  width: 150px;
  height: 50px;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.start-btn:hover {
  background: #1565c0;
}
</style>
<style scoped>
.not-created-card {
  min-width: 120px;
  min-height: 40px;
  background: #e0e0e0;
  color: #757575;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  border: 1px dashed #bdbdbd;
  margin: 8px 0;
}
</style>
