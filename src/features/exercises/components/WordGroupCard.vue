<template>
  <v-card class="pa-2 d-inline-flex align-center" elevation="2" style="width: auto; height: auto">
    <div class="d-inline-flex align-center">
      <template v-for="(item, idx) in wordList" :key="item.id">
        <div class="d-inline-flex align-center">
          <DropZone v-if="item.isDropZone" :items="item.items ?? []" />
          <WordText v-else-if="item.wordText !== undefined" :wordText="item.wordText" />
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
import type { WordItem } from '@/types/exercise'

const props = defineProps<{ wordList: WordItem[] }>()
const wordList = props.wordList
</script>
