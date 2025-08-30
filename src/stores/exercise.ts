import { defineStore } from 'pinia'
import type { WordGroup, Sentence } from '@/types/exercise'

export interface GraphNode {
  nodeId: number
  sentenceId: number
  translationId: number | null
}
export interface GraphLink {
  linkId: number
  sourceNodeId: number
  targetNodeId: number
  isConnected: boolean
  answer: string[]
}
// 参照文の型
export interface ReferenceSentence {
  sentenceId: number
  sentenceWordGroupList: WordGroup[]
}

export const useExerciseStore = defineStore('exercise', {
  state: () => ({
    // グラフ構造
    nodeList: [] as GraphNode[],
    linkList: [] as GraphLink[],
    // 翻訳モデル
    translationModel: [] as Sentence[],
    // 現在の進行状況
    currentTranslationId: 0 as number,
    currentNodeId: 0 as number,
    currentLinkId: null as number | null,
    // 現在の演習データ
    sentenceWordGroupList: [] as WordGroup[],
    draggableWordGroupList: [] as WordGroup[],
    answerList: [] as string[],
    // 進行履歴
    completedLinkIds: [] as number[],
    // 参照文（reference-sentences.json）
    referenceSentences: [] as ReferenceSentence[],
  }),
  actions: {
    /**
     * 回答文字列と一致する全てのリンクを開放し、グラフを更新
     */
    /**
     * 正解時、親リンクがisConnectedなものだけを開放（1距離のみ）
     */
    completeLinksByAnswer(answer: string) {
      let updated = false
      // まず、親リンクがすでにisConnectedなものを列挙
      const canOpen = this.linkList.filter(link => {
        if (link.isConnected) return false
        // 親リンクがすべてisConnected or ルート
        const incoming = this.linkList.filter(l => l.targetNodeId === link.sourceNodeId)
        if (incoming.length === 0) return true
        return incoming.every(l => l.isConnected)
      })
      // その中でanswerが一致するものだけ開放
      const newLinkList = this.linkList.map(link => {
        if (
          !link.isConnected &&
          canOpen.some(l => l.linkId === link.linkId) &&
          Array.isArray(link.answer) &&
          link.answer.includes(answer)
        ) {
          updated = true
          this.completedLinkIds.push(link.linkId)
          return { ...link, isConnected: true }
        }
        return link
      })
      this.linkList = newLinkList
      return updated
    },
    /**
     * sentenceWordGroupListをセット
     */
    setSentenceWordGroupList(list: WordGroup[]) {
      this.sentenceWordGroupList = list
    },

    /**
     * draggableWordGroupListをセット
     */
    setDraggableWordGroupList(list: WordGroup[]) {
      this.draggableWordGroupList = list
    },
    /**
     * DropZoneから呼ばれる: sentenceWordGroupListまたはdraggableWordGroupListを更新（入れ子構造対応）
     */
    updateItemsById(id: number, newItems: WordGroup[]) {
      for (const group of this.sentenceWordGroupList) {
        for (const section of ['upper', 'middle', 'lower'] as const) {
          const wordList = group.contents[section].wordList
          if (!wordList) continue
          for (const item of wordList) {
            if (item.id === id) {
              item.items = [...newItems]
              return
            }
          }
        }
      }
    },
    /**
     * sample3の全データを初期化・ロード
     */
    async initializeSample3() {
      // graph-structure.json
      const graphRes = await fetch('/json/questions/sample3/graph-structure.json')
      const graphData = await graphRes.json()
      this.nodeList = graphData.nodeList
      this.linkList = graphData.linkList
      // translation-model.json
      const modelRes = await fetch('/json/questions/sample3/translation-model.json')
      this.translationModel = await modelRes.json()
      // 最初のノード・リンク
      this.currentTranslationId = 0
      this.currentNodeId = 0
      this.currentLinkId = null
      this.completedLinkIds = []
      await this.loadExerciseData(0)
    },

    /**
     * translationIdに対応する演習データをロード
     */
    async loadExerciseData(translationId: number) {
      // exercise.json
      const exRes = await fetch(`/json/questions/sample3/${translationId}/exercise.json`)
      const exData = await exRes.json()
      this.sentenceWordGroupList = exData.sentenceWordGroupList
      this.draggableWordGroupList = exData.draggableWordGroupList
      this.answerList = exData.answerList ?? []
      this.currentTranslationId = translationId
    },

    /**
     * 指定リンクを進行（正解時に呼ぶ）
     */
    completeLink(linkId: number) {
      const link = this.linkList.find(l => l.linkId === linkId)
      if (link && !link.isConnected) {
        link.isConnected = true
        this.completedLinkIds.push(linkId)
      }
    },

    /**
     * 次に進行可能なリンク一覧を返す
     */
    getAvailableLinks(): GraphLink[] {
      // sourceNodeIdが全てisConnectedなリンクのみ進行可能
      // ただし最初のリンクはisConnected不要
      return this.linkList.filter(link => {
        if (link.isConnected) return false
        // sourceNodeIdから来るリンクがなければ最初のリンク
        const incoming = this.linkList.filter(l => l.targetNodeId === link.sourceNodeId)
        if (incoming.length === 0) return true
        // すべてのincomingがisConnectedなら進行可能
        return incoming.every(l => l.isConnected)
      })
    },

    /**
     * 「作成する」ボタンで呼ぶ: 指定リンクのtargetNodeIdの演習データをロード
     */
    /**
     * 「作成する」ボタンで呼ぶ: 指定リンクのtargetNodeIdの演習データをロード
     * @param linkId 対象リンクID
     * @param parentTranslationId 親ノードのtranslationId（未使用ならnull可）
     */
    /**
     * 「作成する」ボタンで呼ぶ: 指定リンクのtargetNodeIdの演習データをロード
     * @param linkId 対象リンクID
     * @param parentTranslationId 親ノードのtranslationId（nullの場合は何もしない）
     */
    async startExerciseByLink(linkId: number, parentTranslationId: number | null = null) {
      const link = this.linkList.find(l => l.linkId === linkId)
      if (!link) return
      this.currentLinkId = linkId
      this.currentNodeId = link.targetNodeId
      // 現在のtranslationId
      let nextTranslationId: number | null = null
      if (parentTranslationId !== null) {
        nextTranslationId = parentTranslationId
      } else {
        const targetNode = this.nodeList.find(n => n.nodeId === link.targetNodeId)
        nextTranslationId = targetNode?.translationId ?? null
      }
      // すでに同じtranslationIdなら何もしない（stateを保持）
      if (nextTranslationId !== null && this.currentTranslationId === nextTranslationId) {
        return
      }
      // translationIdが異なる場合のみリセット・ロード
      if (nextTranslationId !== null) {
        await this.loadExerciseData(nextTranslationId)
        await this.loadReferenceSentences(nextTranslationId)
      }
    },

    /**
     * reference-sentences.jsonをロードしstoreに保存
     */
    async loadReferenceSentences(translationId: number) {
      // 例: /json/questions/sample3/{translationId}/reference-sentences.json
      const refRes = await fetch(`/json/questions/sample3/${translationId}/reference-sentences.json`)
      this.referenceSentences = await refRes.json()
    },
  },
})
