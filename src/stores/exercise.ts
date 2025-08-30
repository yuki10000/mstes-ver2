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
    mainMessage: '' as string,
    // 進行履歴
    completedLinkIds: [] as number[],
    // 参照文（reference-sentences.json）
    referenceSentences: [] as ReferenceSentence[],
  }),
  actions: {
    /**
     * グラフのノード・リンク・翻訳モデルなど、sample3の全データを初期化・ロードする関数。
     * 最初のノード・リンクも初期化し、最初の演習データもロードする。
     */
    async initializeSample3() {
      const graphRes = await fetch('/json/questions/sample3/graph-structure.json')
      const graphData = await graphRes.json()
      this.nodeList = graphData.nodeList
      this.linkList = graphData.linkList
      const modelRes = await fetch('/json/questions/sample3/translation-model.json')
      this.translationModel = await modelRes.json()
      this.currentTranslationId = 0
      this.currentNodeId = 0
      this.currentLinkId = null
      this.completedLinkIds = []
      await this.loadExerciseData(0)
    },

    /**
     * translationIdに対応する演習データ（exercise.json）をロードし、
     * sentenceWordGroupList, draggableWordGroupList, answerList, currentTranslationIdを更新する関数。
     * @param translationId 対象のtranslationId
     */
    async loadExerciseData(translationId: number) {
      const exRes = await fetch(`/json/questions/sample3/${translationId}/exercise.json`)
      const exData = await exRes.json()
      this.sentenceWordGroupList = exData.sentenceWordGroupList
      this.draggableWordGroupList = exData.draggableWordGroupList
      this.answerList = exData.answerList ?? []
      this.mainMessage = exData.mainMessage ?? ''
      this.currentTranslationId = translationId
    },

    /**
     * reference-sentences.jsonをロードし、storeのreferenceSentencesに保存する関数。
     * @param translationId 対象のtranslationId
     */
    async loadReferenceSentences(translationId: number) {
      const refRes = await fetch(
        `/json/questions/sample3/${translationId}/reference-sentences.json`,
      )
      this.referenceSentences = await refRes.json()
    },

    /**
     * 「作成する」ボタンで呼ばれる。指定リンクのtargetNodeIdの演習データをロードする関数。
     * すでに同じtranslationIdならstateを保持し、異なる場合のみリセット・ロードする。
     * @param linkId 対象リンクID
     * @param parentTranslationId 親ノードのtranslationId（未使用ならnull可）
     */
    async startExerciseByLink(linkId: number, parentTranslationId: number | null = null) {
      const link = this.linkList.find((l) => l.linkId === linkId)
      if (!link) return
      this.currentLinkId = linkId
      this.currentNodeId = link.targetNodeId
      let nextTranslationId: number | null = null
      if (parentTranslationId !== null) {
        nextTranslationId = parentTranslationId
      } else {
        const targetNode = this.nodeList.find((n) => n.nodeId === link.targetNodeId)
        nextTranslationId = targetNode?.translationId ?? null
      }
      if (nextTranslationId !== null && this.currentTranslationId === nextTranslationId) {
        return
      }
      if (nextTranslationId !== null) {
        await this.loadExerciseData(nextTranslationId)
        await this.loadReferenceSentences(nextTranslationId)
      }
    },

    /**
     * 回答文字列と一致する全てのリンクを開放し、グラフを更新する関数。
     * 正解時、親リンクがisConnectedなものだけを開放（1距離のみ）
     * @param answer 回答文字列
     * @returns updated: 何かリンクが開放された場合true
     */
    completeLinksByAnswer(answer: string) {
      let updated = false
      const canOpen = this.linkList.filter((link) => {
        if (link.isConnected) return false
        const incoming = this.linkList.filter((l) => l.targetNodeId === link.sourceNodeId)
        if (incoming.length === 0) return true
        return incoming.every((l) => l.isConnected)
      })
      const newLinkList = this.linkList.map((link) => {
        if (
          !link.isConnected &&
          canOpen.some((l) => l.linkId === link.linkId) &&
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
     * 指定リンクを進行（正解時に呼ぶ）。linkIdのisConnectedをtrueにし、completedLinkIdsに追加する関数。
     * @param linkId 対象リンクID
     */
    completeLink(linkId: number) {
      const link = this.linkList.find((l) => l.linkId === linkId)
      if (link && !link.isConnected) {
        link.isConnected = true
        this.completedLinkIds.push(linkId)
      }
    },

    /**
     * 次に進行可能なリンク一覧を返す関数。
     * sourceNodeIdが全てisConnectedなリンクのみ進行可能（最初のリンクはisConnected不要）
     * @returns 進行可能なGraphLink配列
     */
    getAvailableLinks(): GraphLink[] {
      return this.linkList.filter((link) => {
        if (link.isConnected) return false
        const incoming = this.linkList.filter((l) => l.targetNodeId === link.sourceNodeId)
        if (incoming.length === 0) return true
        return incoming.every((l) => l.isConnected)
      })
    },

    /**
     * sentenceWordGroupListをセットする関数。
     * @param list 新しいWordGroup配列
     */
    setSentenceWordGroupList(list: WordGroup[]) {
      this.sentenceWordGroupList = list
    },

    /**
     * draggableWordGroupListをセットする関数。
     * @param list 新しいWordGroup配列
     */
    setDraggableWordGroupList(list: WordGroup[]) {
      this.draggableWordGroupList = list
    },

    /**
     * DropZoneから呼ばれる: sentenceWordGroupListまたはdraggableWordGroupListを更新（入れ子構造対応）する関数。
     * @param id 対象WordGroupのid
     * @param newItems 新しいWordGroup配列
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
  },
})
