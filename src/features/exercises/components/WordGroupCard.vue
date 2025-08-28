<template>
  <v-card class="pa-2 d-inline-flex align-center" elevation="2" style="width: auto; height: auto">
    <div class="d-inline-flex align-center">
      <template v-for="(item, idx) in wordList" :key="item.id">
        <div class="d-inline-flex align-center">
          <DropZone v-if="item.isDropZone" v-model:items="item.items" />
          <WordText v-else :wordText="item.wordText" />
        </div>
        <div v-if="idx < wordList.length - 1" class="d-inline-flex align-center">
          <WordDivider />
        </div>
      </template>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import DropZone from './DropZone.vue'
import WordText from './WordText.vue'
import WordDivider from './WordDivider.vue'

const props = defineProps<{ wordList: Array<any> }>()

// DropZone用のitems配列を各isDropZone要素に初期化
props.wordList.forEach((item) => {
  if (item.isDropZone && !item.items) item.items = []
})

const wordList = props.wordList
</script>
