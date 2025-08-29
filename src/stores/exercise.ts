import { defineStore } from 'pinia'
import type { WordGroup, Sentence } from '@/types/exercise'

// questionListの型
export interface QuestionItem {
  questionId: string
  phaseId: string
  isReview?: boolean
}

export const useExerciseStore = defineStore('exercise', {
  state: () => ({
    referenceCentenceId: 0 as number,
    sentenceWordGroupList: [] as WordGroup[],
    draggableWordGroupList: [] as WordGroup[],
    referenceSentenceList: [] as Sentence[],
    sentencesList: [] as Sentence[],
    referenceWordGroupList: [] as WordGroup[],
    answer: '' as string,
    // 問題群のリスト
    questionList: [] as QuestionItem[],
    currentIndex: 0 as number, // 現在のインデックス
  }),
  actions: {
    /**
     * 現在の問題のパスを取得
     */
    getCurrentPath() {
      const { questionId, phaseId } = this.questionList[this.currentIndex]
      return `/json/questions/${questionId}/${phaseId}`
    },

    /**
     * 現在の問題が復習用かどうかを判定
     */
    isCurrentReview() {
      const q = this.questionList[this.currentIndex]
      return q && q.isReview === true
    },

    /**
     * 全てのstateを初期化
     */
    clearState() {
      this.referenceCentenceId = 0
      this.sentenceWordGroupList = []
      this.draggableWordGroupList = []
      this.referenceSentenceList = []
      this.sentencesList = []
      this.referenceWordGroupList = []
      this.answer = ''
    },

    /**
     * 問題・参照文データを全て取得しstateにセット
     */
    async fetchAll() {
      this.clearState()
      await this.fetchExerciseJson()
      await this.fetchReferenceSentences()
    },

    /**
     * 問題データ(exercise.json)を取得しstateにセット
     * 復習用(isReview)の場合は何もしない
     */
    async fetchExerciseJson() {
      this.sentenceWordGroupList = []
      this.draggableWordGroupList = []
      if (this.isCurrentReview()) return
      const path = this.getCurrentPath()
      const res = await fetch(`${path}/exercise.json`)
      const data = await res.json()
      this.referenceCentenceId = data.referenceCentenceId
      this.sentenceWordGroupList = data.sentenceWordGroupList
      this.draggableWordGroupList = data.draggableWordGroupList
      this.answer = data.answer ?? ''
    },

    /**
     * 参照文データ(reference-sentences.json)を取得しstateにセット
     */
    async fetchReferenceSentences() {
      this.referenceSentenceList = []
      this.sentencesList = []
      this.referenceWordGroupList = []
      const path = this.getCurrentPath()
      const res = await fetch(`${path}/reference-sentences.json`)
      const data = await res.json()
      this.referenceSentenceList = data
      this.sentencesList = data
      // referenceCentenceIdと一致するものを抽出
      const ref = data.find((item: Sentence) => item.sentenceId === this.referenceCentenceId)
      this.referenceWordGroupList = ref ? ref.sentenceWordGroupList : []
    },

    /**
     * 問題を次に進める
     */
    async nextQuestion() {
      this.currentIndex = (this.currentIndex + 1) % this.questionList.length
      await this.fetchAll()
    },

    /**
     * 最初の問題にリセット
     */
    async resetQuestions() {
      this.currentIndex = 0
      await this.fetchAll()
    },

    /**
     * sentenceWordGroupListをセット
     */
    setSentenceWordGroupList(list: WordGroup[]) {
      this.sentenceWordGroupList = list
      console.log('changed')
    },

    /**
     * draggableWordGroupListをセット
     */
    setDraggableWordGroupList(list: WordGroup[]) {
      this.draggableWordGroupList = list
      console.log(list.length)
    },

    /**
     * DropZoneなどからidと新items配列を受けて該当item.itemsを更新
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
