<template>
  <v-container fluid class="pa-6">
    <v-sheet elevation="2" rounded>
      <component :is="currentView" @start-exercise="showExerciseTab" @back-to-graph="showGraph" />
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useExerciseStore } from '@/stores/exercise'
import SentenceTransitionFlow from '@/features/exercises/components/TranslationFlow.vue'
import ExerciseTab from '@/features/exercises/components/ExerciseTab.vue'

// storeインスタンス
const exerciseStore = useExerciseStore()

// 現在表示しているビュー（グラフ or 演習タブ）
const currentView = ref<typeof SentenceTransitionFlow | typeof ExerciseTab>(SentenceTransitionFlow)

/**
 * グラフ画面から演習タブに切り替える関数。
 * SentenceTransitionFlowからemitされたときに呼ばれる。
 */
function showExerciseTab() {
  currentView.value = ExerciseTab
}

/**
 * 演習タブからグラフ画面に戻す関数。
 * ExerciseTabからemitされたときに呼ばれる。
 */
function showGraph() {
  currentView.value = SentenceTransitionFlow
}

/**
 * マウント時にsample3のデータを初期化し、初期表示をグラフ画面にする関数。
 */
onMounted(async () => {
  await exerciseStore.initializeSample3()
  currentView.value = SentenceTransitionFlow // 初期表示は必ずグラフ
})
</script>

<style scoped></style>
