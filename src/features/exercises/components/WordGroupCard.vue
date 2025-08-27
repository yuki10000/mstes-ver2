<template>
  <v-card class="pa-2 d-inline-flex align-center" elevation="2" style="width: auto; height: auto">
    <div class="d-inline-flex align-center">
      <template v-for="(item, idx) in WordList" :key="item.id">
        <div class="d-inline-flex align-center">
          <component
            :is="item.isDropZone ? DropZone : WordText"
            v-bind="item.isDropZone ? {} : { wordText: item.wordText }"
          />
        </div>
        <div v-if="idx < WordList.length - 1" class="d-inline-flex align-center">
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

const props = defineProps<{
  wordList: Array<any>
}>()

const WordList = props.wordList
</script>
