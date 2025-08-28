// 回答判定用のcomposable
import { computed, type Ref } from 'vue'
import { useExerciseStore } from '@/stores/exercise'
import type { WordGroup, WordItem } from '@/types/exercise'

/**
 * sentenceWordGroupListから完成した文字列を生成する
 * @param sentenceWordGroupList - 判定対象のWordGroup配列（Ref型）
 */
export function useAnswerString(sentenceWordGroupList: Ref<WordGroup[]>) {
  const exerciseStore = useExerciseStore()

  const answerString = computed(() => {
    const list = sentenceWordGroupList.value
    if (!Array.isArray(list)) return ''
    return list.map((group: WordGroup) => {
      const wordList = group.contents.middle.wordList || []
      return wordList.map((word: WordItem) => {
        if (word.isDropZone) {
          // DropZoneの場合: itemsが1つ以上なら、その中のmiddle.wordListのwordTextを連結
          if (Array.isArray(word.items) && word.items.length > 0) {
            return word.items.map((itemGroup: WordGroup) => {
              const itemWordList = itemGroup.contents.middle.wordList || []
              return itemWordList.map((w: WordItem) => w.wordText || '').join('')
            }).join('')
          }
          return ''
        } else {
          // DropZoneでない場合: wordTextをそのまま
          return word.wordText || ''
        }
      }).join('')
    }).join('')
  })

  const isCorrect = computed(() => answerString.value === exerciseStore.answer)

  return { answerString, isCorrect }
}
