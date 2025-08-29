<template>
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
    <div class="mt-8" style="text-align: center" v-if="!lastIsCorrect">
      <v-btn color="primary" @click="checkAnswer">回答を確認</v-btn>
    </div>
    <ExerciseMessageModal
      :model-value="showMessage"
      :is-correct="lastIsCorrect"
      :answer-string="lastAnswerString"
      @close="showMessage = false"
    />
  </v-container>
</template>

<script setup lang="ts">
import SentenceContainer from './SentenceContainer.vue'
import DragglableWordGroupArea from './DragglableWordGroupArea.vue'
import { ref, computed, watch, defineEmits } from 'vue'
import { useExerciseStore } from '@/stores/exercise'
import { useAnswerString } from '../composables/answer'
import ExerciseMessageModal from './AnswerResultModal.vue'

const exerciseStore = useExerciseStore()

// storeのstateをcomputedで参照し、問題切り替え時に自動更新
const referenceSentenceWordGroupList = computed(() => exerciseStore.referenceWordGroupList)
const sentenceWordGroupList = computed(() => exerciseStore.sentenceWordGroupList)
const draggableWordGroupList = computed(() => exerciseStore.draggableWordGroupList)

const showMessage = ref(false)
const lastIsCorrect = ref(false)
const lastAnswerString = ref('')

const emit = defineEmits(['answered'])

// 問題切り替え時に正誤状態をリセット
watch(
  () => exerciseStore.currentIndex,
  () => {
    lastIsCorrect.value = false
  },
)

function checkAnswer() {
  const { answerString, isCorrect } = useAnswerString()
  lastIsCorrect.value = isCorrect.value
  lastAnswerString.value = answerString.value
  showMessage.value = true
  emit('answered', isCorrect.value)
}
</script>
