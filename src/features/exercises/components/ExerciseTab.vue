<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <SentenceContainer :wordGroupList="referenceSentenceWordGroupList" />
      </v-col>
      <v-col cols="12">
        <SentenceContainer :wordGroupList="sentenceWordGroupList" />
      </v-col>
      <v-col cols="12">
        <DragglableWordGroupArea :localList="draggableWordGroupList" />
      </v-col>
    </v-row>
    <div class="mt-8" style="text-align: center">
      <v-btn color="primary" @click="checkAnswer">回答を確認</v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import SentenceContainer from './SentenceContainer.vue'
import DragglableWordGroupArea from './DragglableWordGroupArea.vue'

import { computed } from 'vue'
import { useExerciseStore } from '@/stores/exercise'
import { useAnswerString } from '../composables/answer'

const exerciseStore = useExerciseStore()

// storeのstateをcomputedで参照し、問題切り替え時に自動更新
const referenceSentenceWordGroupList = computed(() => exerciseStore.referenceWordGroupList)
const sentenceWordGroupList = computed(() => exerciseStore.sentenceWordGroupList)
const draggableWordGroupList = computed(() => exerciseStore.draggableWordGroupList)

function checkAnswer() {
  const { answerString, isCorrect } = useAnswerString()
  alert(isCorrect.value ? '正解です！' : '不正解です' + ':' + answerString.value)
}
</script>
