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
            <ExerciseTab
              v-else
              :referenceSentenceWordGroupList="referenceSentenceWordGroupList"
              :sentenceWordGroupList="sentenceWordGroupList"
              :draggableWordGroupList="draggableWordGroupList"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ExerciseTab from '@/features/exercises/components/ExerciseTab.vue'
import ModelCheckTab from '@/features/exercises/components/ModelCheckTab.vue'
import { useExerciseStore } from '@/stores/exercise'

const view = ref('model')
const exerciseStore = useExerciseStore()

onMounted(() => {
  exerciseStore.fetchAll()
})

const sentenceWordGroupList = computed(() => exerciseStore.sentenceWordGroupList)
const draggableWordGroupList = computed(() => exerciseStore.draggableWordGroupList)
const referenceSentenceWordGroupList = computed(() => exerciseStore.referenceWordGroupList)
</script>

<style scoped></style>
