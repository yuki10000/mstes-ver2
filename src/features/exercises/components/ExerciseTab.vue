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

import { ref } from 'vue'
import { useExerciseStore } from '@/stores/exercise'

import { useAnswerString } from '../composables/answer'

const exerciseStore = useExerciseStore()

// storeから初期値を取得しrefで管理
const referenceSentenceWordGroupList = ref(exerciseStore.referenceWordGroupList)
const sentenceWordGroupList = ref(exerciseStore.sentenceWordGroupList)
const draggableWordGroupList = ref(exerciseStore.draggableWordGroupList)

function checkAnswer() {
  const { answerString, isCorrect } = useAnswerString()
  alert(isCorrect.value ? '正解です！' : '不正解です' + ':' + answerString.value)
}
</script>
