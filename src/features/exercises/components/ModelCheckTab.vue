<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div v-for="(sentence, idx) in sentenceList" :key="sentence.sentenceId" class="mb-6">
          <SentenceContainer :wordGroupList="sentence.sentenceWordGroupList" />
          <v-row
            v-if="!(isCurrentReview && idx === sentenceList.length - 1)"
            justify="center"
            class="mt-2"
          >
            <v-icon size="36" color="grey">mdi-chevron-double-down</v-icon>
          </v-row>
        </div>
        <v-row
            v-if="!(isCurrentReview)"
            justify="center"
            class="mt-2"
          >
            <v-card class="pa-3" elevation="0">作成する文</v-card>
          </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useExerciseStore } from '@/stores/exercise'
import SentenceContainer from './SentenceContainer.vue'
import { storeToRefs } from 'pinia'

const exerciseStore = useExerciseStore()
const sentenceList = computed(() => exerciseStore.sentencesList)
const { questionList, currentIndex } = storeToRefs(exerciseStore)

const isCurrentReview = computed(() => {
  const q = questionList.value?.[currentIndex.value]
  return q && q.isReview === true
})
</script>
