<template>
  <div class="exercise-tab-root">
    <!-- 右上固定の次の問題ボタン -->
    <div class="next-btn-fixed">
      <v-btn color="primary" class="graph-btn-style" @click="handleBackToGraph" elevation="2" rounded icon size="56" style="margin-bottom: 12px;" :disabled="lastIsCorrect">
        <v-icon size="32" color="white">mdi-graph</v-icon>
      </v-btn>
      <v-btn color="primary" class="next-btn-style" @click="onNextClick" elevation="2" rounded icon size="56">
        <v-icon size="32" color="white">mdi-chevron-double-right</v-icon>
      </v-btn>
    </div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <SentenceContainer :wordGroupList="referenceSentenceWordGroupList" />
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-icon size="36" color="grey">mdi-chevron-double-down</v-icon>
        </v-col>
        <v-col cols="12">
          <SentenceContainer :wordGroupList="sentenceWordGroupList" />
        </v-col>
        <v-col cols="12">
          <DragglableWordGroupArea :localList="draggableWordGroupList" />
        </v-col>
      </v-row>
      <div class="mt-8" style="text-align: center" v-if="!showMessage && !lastIsCorrect">
        <v-btn color="primary" @click="checkAnswer">回答を確認</v-btn>
      </div>
      <ExerciseMessageModal
        :model-value="showMessage"
        :is-correct="lastIsCorrect"
        :answer-string="lastAnswerString"
        @close="showMessage = false"
        @next="handleNext"
      />
      <!-- 次の問題に進む確認ダイアログ -->
      <v-dialog v-model="showNextConfirm" max-width="600">
        <v-card>
          <v-card-title class="text-h6 text-center">
            <v-icon color="primary" size="32">mdi-alert-circle</v-icon>
            <span class="ml-2">{{ nextConfirmMessage }}</span>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn color="grey" @click="showNextConfirm = false">キャンセル</v-btn>
            <v-btn color="primary" @click="handleNextConfirm">次の問題に進む</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import SentenceContainer from './SentenceContainer.vue'
import DragglableWordGroupArea from './DragglableWordGroupArea.vue'
import { ref, computed, watch, defineEmits } from 'vue'
import { useExerciseStore } from '@/stores/exercise'
import { useAnswerString } from '../composables/answer'
import ExerciseMessageModal from './AnswerResultModal.vue'

const exerciseStore = useExerciseStore()
const emit = defineEmits(['answered', 'back-to-graph'])

// storeのstateをcomputedで参照し、問題切り替え時に自動更新
// translationModel（translation-model.json）からsentenceId一致のものを参照
const referenceSentenceWordGroupList = computed(() => {
  const ref = exerciseStore.translationModel.find(
    (s) => s.sentenceId === exerciseStore.currentTranslationId,
  )
  return ref ? ref.sentenceWordGroupList : []
})
const sentenceWordGroupList = computed(() => exerciseStore.sentenceWordGroupList)
const draggableWordGroupList = computed(() => exerciseStore.draggableWordGroupList)

const showMessage = ref(false)
const lastIsCorrect = ref(false)
const lastAnswerString = ref('')

// 次の問題に進む確認ダイアログ
const showNextConfirm = ref(false)
const nextConfirmMessage = ref('')

// 問題切り替え時に正誤状態をリセット
watch(
  () => exerciseStore.currentTranslationId,
  () => {
    lastIsCorrect.value = false
  },
)

function checkAnswer() {
  const { answerString, isCorrect } = useAnswerString()
  lastIsCorrect.value = isCorrect.value
  lastAnswerString.value = answerString.value
  // 正解時のみリンク開放
  if (isCorrect.value) {
    exerciseStore.completeLinksByAnswer(answerString.value)
  }
  showMessage.value = true
  emit('answered', isCorrect.value)
}

function handleNext() {
  showMessage.value = false
  emit('back-to-graph')
}

function onNextClick() {
  // すでに正解しているかどうか
  if (lastIsCorrect.value) {
    nextConfirmMessage.value = '次の問題に進んでもいいですか？'
  } else {
    nextConfirmMessage.value = '問題に正解していませんが次の問題に進みますか？'
  }
  showNextConfirm.value = true
}

function handleNextConfirm() {
  showNextConfirm.value = false
  // 未正解で進む場合は距離1の全リンクを解放
  if (!lastIsCorrect.value) {
    unlockAllDistance1Links()
  }
  emit('back-to-graph')
}

// 未正解で進む場合: 既存の解放されているノードから距離1で繋がっている全てのリンクを解放
function unlockAllDistance1Links() {
  // 進行可能なリンクを全て開放
  const availableLinks = exerciseStore.getAvailableLinks()
  for (const link of availableLinks) {
    if (!link.isConnected) {
      link.isConnected = true
      exerciseStore.completedLinkIds.push(link.linkId)
    }
  }
  // linkListを新しい配列で置き換えてリアクティブに
  exerciseStore.linkList = [...exerciseStore.linkList]
}

function handleBackToGraph() {
  emit('back-to-graph')
}
//
// スタイル
</script>

<style scoped>
.exercise-tab-root {
  position: relative;
}
.next-btn-fixed {
  position: absolute;
  top: 16px;
  right: 24px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.graph-btn-style {
  background-color: #1976d2 !important;
  color: #fff !important;
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}
.next-btn-style {
  background-color: #1976d2 !important;
  color: #fff !important;
  width: 56px;
  height: 56px;
  min-width: 56px;
  min-height: 56px;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.15);
}
</style>
