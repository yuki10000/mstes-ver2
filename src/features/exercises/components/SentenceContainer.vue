<template>
  <v-card class="pa-4 d-flex flex-row justify-center align-center" elevation="3">
    <div class="d-flex flex-row justify-center align-center w-100">
      <WordGroupSection
        v-for="group in wordGroups"
        :key="group.wordGroupId"
        :wordGroup="group"
        class="mx-2"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import WordGroupSection from './WordGroupSection.vue'

// サンプルjsonをローカルで定義
const wordGroups = [
  {
    wordGroupId: 1,
    subContents: {
      upper: {
        contentType: 'label',
        labelSettings: {
          labelText: 'S: 主語',
          isLineUpper: false,
          isLineLower: true,
        },
      },
      lower: {
        contentType: 'wordGroupCard',
        wordList: [
          { id: 1, isDropZone: false, wordText: '太郎' },
          { id: 2, isDropZone: false, wordText: 'は' },
        ],
      },
    },
    wordList: [
      { id: 1, isDropZone: true },
      { id: 2, isDropZone: false, wordText: 'は' },
    ],
  },
  {
    wordGroupId: 2,
    subContents: {
      upper: {
        contentType: 'label',
        labelSettings: {
          labelText: 'DO: 目的語',
          isLineUpper: false,
          isLineLower: true,
        },
      },
      lower: {
        contentType: 'none',
      },
    },
    wordList: [
      { id: 1, isDropZone: true },
      { id: 2, isDropZone: false, wordText: 'を' },
    ],
  },
  {
    wordGroupId: 2,
    subContents: {
      upper: {
        contentType: 'label',
        labelSettings: {
          labelText: 'DO: 目的語',
          isLineUpper: false,
          isLineLower: true,
        },
      },
      lower: {
        contentType: 'none',
      },
    },
    wordList: [
      { id: 1, isDropZone: true },
      { id: 2, isDropZone: false, wordText: 'を' },
    ],
  },
  {
    wordGroupId: 3,
    subContents: {
      upper: {
        contentType: 'label',
        labelSettings: {
          labelText: 'V: 動詞',
          isLineUpper: false,
          isLineLower: true,
        },
      },
      lower: {
        contentType: 'none',
        wordList: [
          { id: 3, isDropZone: false, wordText: '動き' },
          { id: 4, isDropZone: false, wordText: 'ます' },
        ],
      },
    },
    wordList: [
      { id: 1, isDropZone: true },
      { id: 2, isDropZone: false, wordText: 'ます' },
    ],
  },
]
</script>
