import { defineStore } from 'pinia'
import type { WordGroup, Sentence } from '@/types/exercise'

export const useExerciseStore = defineStore('exercise', {
  state: () => ({
    referenceCentenceId: 0 as number,
    sentenceWordGroupList: [] as WordGroup[],
    draggableWordGroupList: [] as WordGroup[],
    referenceSentenceList: [] as Sentence[],
    sentencesList: [] as Sentence[],
    referenceWordGroupList: [] as WordGroup[],
    answer: '' as string,
  }),
  actions: {
    async fetchExerciseJson() {
      const res = await fetch('/json/1/1/1/exercise.json')
      const data = await res.json()
      this.referenceCentenceId = data.referenceCentenceId
      this.sentenceWordGroupList = data.sentenceWordGroupList
      this.draggableWordGroupList = data.draggableWordGroupList
      this.answer = data.answer ?? ''
    },
    async fetchReferenceSentences() {
      const res = await fetch('/json/1/1/reference-sentences.json')
      const data = await res.json()
      this.referenceSentenceList = data
      this.sentencesList = data
      // referenceCentenceIdと一致するものを抽出
      const ref = data.find((item: Sentence) => item.sentenceId === this.referenceCentenceId)
      this.referenceWordGroupList = ref ? ref.sentenceWordGroupList : []
    },
    async fetchAll() {
      await this.fetchExerciseJson()
      await this.fetchReferenceSentences()
    },
    setSentenceWordGroupList(list: WordGroup[]) {
      this.sentenceWordGroupList = list
      console.log("changed")
    },
    setDraggableWordGroupList(list: WordGroup[]) {
      this.draggableWordGroupList = list
    }
  }
})
