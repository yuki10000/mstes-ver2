<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <div class="d-flex flex-row align-center mb-4" style="gap: 16px;">
          <v-btn :color="view === 'model' ? 'primary' : 'grey'" @click="view = 'model'">モデル</v-btn>
          <v-btn :color="view === 'exercise' ? 'primary' : 'grey'" @click="view = 'exercise'">演習</v-btn>
        </div>
        <v-card elevation="2">
          <v-card-text>
            <ModelCheckTab v-if="view === 'model'" />
            <ExerciseTab
              v-else
              :referenceSentenceWordGroupList="referenceSentenceWordGroupList"
              :sentenceWordGroupList="sentenceWordGroupList"
              :draggableWordGroupList="draggableWordGroupList"
              @update-dropzone="onUpdateDropzone"
              @update-pool="onUpdatePool"
              @dropzone-overflow="onDropzoneOverflow"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ExerciseTab from '@/features/exercises/components/ExerciseTab.vue';
import ModelCheckTab from '@/features/exercises/components/ModelCheckTab.vue';
import { referenceSentenceWordGroupList, sentenceWordGroupList as initialSentenceWordGroupList, draggableWordGroupList as initialDraggableWordGroupList } from '@/features/exercises/components/exercise'

const view = ref('model')
const sentenceWordGroupList = ref(JSON.parse(JSON.stringify(initialSentenceWordGroupList)))
const draggableWordGroupList = ref(JSON.parse(JSON.stringify(initialDraggableWordGroupList)))

function onUpdateDropzone({ wordGroupId, wordList }: { wordGroupId: number, wordList: any[] }) {
  const group = sentenceWordGroupList.value.find(g => g.wordGroupId === wordGroupId)
  if (group) {
    group.contents.middle.wordList = wordList
  }
}

function onUpdatePool(newList: any[]) {
  draggableWordGroupList.value = newList
}

function onDropzoneOverflow(removedItems: any[]) {
  draggableWordGroupList.value.push(...removedItems)
}
</script>

<style scoped></style>
