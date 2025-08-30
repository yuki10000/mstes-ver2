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
import SentenceTransitionFlow from '@/features/exercises/components/SentenceTransitionFlow.vue'
import ExerciseTab from '@/features/exercises/components/ExerciseTab.vue'

const exerciseStore = useExerciseStore()

const currentView = ref<typeof SentenceTransitionFlow | typeof ExerciseTab>(SentenceTransitionFlow)

function showExerciseTab() {
  currentView.value = ExerciseTab
}
function showGraph() {
  currentView.value = SentenceTransitionFlow
}

onMounted(async () => {
  await exerciseStore.initializeSample3()
  currentView.value = SentenceTransitionFlow // 初期表示は必ずグラフ
})
</script>


<style scoped>
</style>
