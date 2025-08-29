<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <div class="d-flex flex-row align-center mb-4" style="gap: 16px">
          <v-btn :color="view === 'model' ? 'primary' : 'grey'" @click="view = 'model'"
            >モデル</v-btn
          >
          <v-btn :color="view === 'exercise' ? 'primary' : 'grey'" @click="view = 'exercise'"
            >演習</v-btn
          >
        </div>
        <v-card elevation="2">
          <v-card-text>
            <ModelCheckTab v-if="view === 'model'" />
            <template v-else>
              <ExerciseTab v-if="!isCurrentReview" />
              <div v-else class="py-8 text-center">
                <v-alert type="info" border="start" color="info" variant="tonal">
                  この問題は復習用です。次の問題へ進んでください。
                </v-alert>
              </div>
            </template>
            <div class="mt-4" style="text-align: center">
              <v-btn color="secondary" @click="handleNextQuestion">次の問題</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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

async function handleNextQuestion() {
  await exerciseStore.nextQuestion()
}
</script>

<style scoped></style>
