<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-tabs v-model="view" fixed-tabs class="mb-4 custom-tabs">
          <v-tab value="model">現在までの変換過程</v-tab>
          <v-tab value="exercise">文の作成</v-tab>
        </v-tabs>
        <v-card elevation="0">
          <v-card-text>
            <v-window v-model="view">
              <v-window-item value="model">
                <ModelCheckTab />
              </v-window-item>
              <v-window-item value="exercise">
                <template v-if="!isCurrentReview">
                  <ExerciseTab @answered="onAnswered" />
                </template>
                <template v-else>
                  <div class="py-8 text-center">
                    <v-alert type="info" border="start" color="info" variant="tonal">
                      この問題は復習用です。次の問題へ進んでください。
                    </v-alert>
                  </div>
                </template>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
        <!-- 右下に小さな次へボタン -->
        <v-btn
          icon
          color="primary"
          class="next-fab"
          @click="handleNextButton"
          style="position: fixed; top: 32px; right: 32px; z-index: 1000"
          size="small"
        >
          <v-icon>mdi-chevron-double-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="showNextWarning" max-width="320">
      <v-card>
        <v-card-title class="text-h6 text-center">演習に正解していません</v-card-title>
        <v-card-actions class="justify-center" style="gap: 16px">
          <v-btn color="grey" @click="showNextWarning = false">戻る</v-btn>
          <v-btn color="primary" @click="proceedAnyway">次の変換に進む</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useExerciseStore } from '@/stores/exercise'
import ExerciseTab from '@/features/exercises/components/ExerciseTab.vue'
import ModelCheckTab from '@/features/exercises/components/ModelCheckTab.vue'
import { useRoute } from 'vue-router'

const view = ref('model')
const exerciseStore = useExerciseStore()
const route = useRoute()
const showNextWarning = ref(false)
const lastIsCorrect = ref(false)

async function loadRoomQuestions(roomId: string) {
  // /json/rooms/{roomId}.json からquestionListを取得しstoreにセット
  const res = await fetch(`/json/rooms/${roomId}.json`)
  if (!res.ok) return
  const data = await res.json()
  if (Array.isArray(data.questionList)) {
    exerciseStore.questionList = data.questionList
    exerciseStore.currentIndex = 0
  }
}

onMounted(async () => {
  const roomId = route.params.roomId as string
  if (roomId) {
    await loadRoomQuestions(roomId)
  }
  await exerciseStore.fetchAll()
})

// phase(問題)が切り替わるたびにviewを'model'にリセット
watch(
  () => exerciseStore.currentIndex,
  () => {
    view.value = 'model'
  },
)

import type { QuestionItem } from '@/stores/exercise'
const isCurrentReview = computed(() => {
  const q = exerciseStore.questionList[exerciseStore.currentIndex] as QuestionItem | undefined
  return q && q.isReview === true
})

function onAnswered(isCorrect: boolean) {
  lastIsCorrect.value = isCorrect
}

async function handleNextButton() {
  if (!isCurrentReview.value && !lastIsCorrect.value) {
    showNextWarning.value = true
    return
  }
  await exerciseStore.nextQuestion()
}

const proceedAnyway = () => {
  showNextWarning.value = false
  exerciseStore.nextQuestion()
}
</script>

<style scoped>
.custom-tabs .v-tab--selected {
  background: #e3f2fd !important; /* 淡いブルー系 */
  border-radius: 8px 8px 0 0;
  transition: background 0.2s;
}
</style>
