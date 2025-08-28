<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <SentenceContainer :wordGroupList="sentenceWordGroupList" @dropzone-overflow="handleDropZoneOverflow" @update-dropzone="onUpdateDropZone" />
      </v-col>
      <v-col cols="12">
        <DragglableWordGroupArea :localList="draggableWordGroupList" @update-pool="onUpdatePool" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SentenceContainer from './SentenceContainer.vue'
import DragglableWordGroupArea from './DragglableWordGroupArea.vue'

// まとめて管理する語群リスト
const sentenceWordGroupList = ref([
  {
    wordGroupId: 1,
    contents: {
      upper: { contentType: 'none' },
      middle: {
        contentType: 'wordGroupCard',
        wordList: [
          { id: 1, isDropZone: true, items: [] },
          { id: 2, isDropZone: false, wordText: 'は' },
        ],
      },
      lower: { contentType: 'none' },
    },
  },
  {
    wordGroupId: 2,
    contents: {
      upper: { contentType: 'none' },
      middle: {
        contentType: 'wordGroupCard',
        wordList: [
          { id: 1, isDropZone: true, items: [] },
          { id: 2, isDropZone: false, wordText: 'を' },
        ],
      },
      lower: { contentType: 'none' },
    },
  },
  {
    wordGroupId: 3,
    contents: {
      upper: { contentType: 'none' },
      middle: {
        contentType: 'wordGroupCard',
        wordList: [
          { id: 1, isDropZone: true, items: [] },
          { id: 2, isDropZone: false, wordText: 'ます' },
        ],
      },
      lower: { contentType: 'none' },
    },
  },
])

const draggableWordGroupList = ref([
  {
    wordGroupId: 1,
    contents: {
      upper: { contentType: 'none' },
      middle: {
        contentType: 'wordGroupCard',
        wordList: [
          { id: 1, isDropZone: false, wordText: '太郎' },
        ],
      },
      lower: { contentType: 'none' },
    },
  },
  {
    wordGroupId: 2,
    contents: {
      upper: { contentType: 'none' },
      middle: {
        contentType: 'wordGroupCard',
        wordList: [
          { id: 1, isDropZone: false, wordText: '二郎' },
        ],
      },
      lower: { contentType: 'none' },
    },
  },
  {
    wordGroupId: 3,
    contents: {
      upper: { contentType: 'none' },
      middle: {
        contentType: 'wordGroupCard',
        wordList: [
          { id: 1, isDropZone: false, wordText: 'hoge' },
        ],
      },
      lower: { contentType: 'none' },
    },
  },
])

// ドロップゾーンの更新イベント
function onUpdateDropZone({ wordGroupId, wordList }: { wordGroupId: number, wordList: any[] }) {
  const group = sentenceWordGroupList.value.find(g => g.wordGroupId === wordGroupId)
  if (group) {
    group.contents.middle.wordList = wordList
  }
}

// プール（語群エリア）の更新イベント
function onUpdatePool(newList: any[]) {
  draggableWordGroupList.value = newList
}

// DropZoneから溢れたカードをプールに戻す
function handleDropZoneOverflow(removedItems: any[]) {
  // removedItems: [{...wordGroupSection}] の配列
  draggableWordGroupList.value.push(...removedItems)
}
</script>
