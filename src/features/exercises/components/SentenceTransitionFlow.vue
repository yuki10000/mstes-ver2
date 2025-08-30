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

// 木構造レイアウト計算
function calcTreeLayout(
  nodeList: GraphNode[],
  linkList: GraphLink[],
): { nodeDepth: Record<number, number>; nodePos: Record<number, { x: number; y: number }> } {
  // 1. 各ノードの親を調べる
  const parents: Record<number, number> = {}
  linkList.forEach((link: GraphLink) => {
    parents[link.targetNodeId] = link.sourceNodeId
  })
  // 2. ルートノードを探す（親がいないノード）
  const rootNodes = nodeList.filter((n) => !(n.nodeId in parents))
  // 3. 各ノードのdepthを計算
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
  // 4. depthごとにノードをグループ化
  const depthGroups: Record<number, number[]> = {}
  nodeList.forEach((n) => {
    const d = nodeDepth[n.nodeId] ?? 0
    if (!depthGroups[d]) depthGroups[d] = []
    depthGroups[d].push(n.nodeId)
  })
  // 5. 各ノードのx/y座標を決定（同じ高さのノードは中央揃えで横方向に間隔をとる）
  const nodePos: Record<number, { x: number; y: number }> = {}
  const xGap = 1000,
    yGap = 180,
    yStart = 100
  Object.entries(depthGroups).forEach(([depthStr, ids]) => {
    const depth: number = parseInt(depthStr, 10)
    const nodeIds: number[] = ids as number[]
    const count: number = nodeIds.length
    // 横方向の中央揃え計算
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

// ノードが「作成済み」かどうかを判定する関数
function isNodeCreated(nodeId: number, nodeList: GraphNode[], linkList: GraphLink[]): boolean {
  if (nodeList.length === 0) return false
  // ルートノード（親がいないノード）は常に作成済み
  const parents: Record<number, number> = {}
  linkList.forEach((link) => {
    parents[link.targetNodeId] = link.sourceNodeId
  })
  const rootNode = nodeList.find((n) => !(n.nodeId in parents))
  if (!rootNode) return false
  if (nodeId === rootNode.nodeId) return true
  // それ以外は、isConnectedなリンクで到達できる場合のみ作成済み
  // 逆引き: targetNodeId => link
  const incomingLinks = linkList.filter((l) => l.targetNodeId === nodeId && l.isConnected)
  if (incomingLinks.length === 0) return false
  // どれかの親ノードが作成済みならOK
  return incomingLinks.some((l) => isNodeCreated(l.sourceNodeId, nodeList, linkList))
}

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

// エッジ: storeのlinkListから生成
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

// 進行可能なリンクのtargetNodeIdリスト
const availableTargetNodeIds = computed(() =>
  exerciseStore.getAvailableLinks().map((link) => link.targetNodeId),
)

// 指定ノードの親ノードのtranslationIdを取得
function getParentTranslationId(nodeId: number): number | null {
  // 対応するリンク（targetNodeIdがnodeId）を取得
  const link = exerciseStore.linkList.find((l) => l.targetNodeId === nodeId)
  if (!link) return null
  // 親ノードを取得
  const parentNode = exerciseStore.nodeList.find((n) => n.nodeId === link.sourceNodeId)
  return parentNode?.translationId ?? null
}

// 「作成する」ボタン押下時
async function handleStartExercise(nodeId: number, parentTranslationId: number | null) {
  // 対応するリンクを取得
  const link = exerciseStore.linkList.find((l) => l.targetNodeId === nodeId && !l.isConnected)
  if (link) {
    // parentTranslationIdをstoreのメソッドに渡す
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
