<template>
  <v-container class="pa-0 d-flex flex-column align-center justify-center text-center" fluid>
    <!-- 上部セクション（noneの場合は何も表示しない） -->
    <div v-if="upperContentType !== 'none'" class="mb-1 w-100 d-flex justify-center">
      <component
        :is="upperContentType === 'label' ? Label : WordGroupCard"
        v-bind="upperContentType === 'label' ? upperLabelProps : { wordList: upperWordList }"
      />
    </div>
    <!-- 真ん中のWordGroupCard（必ず表示） -->
    <div class="mb-1 w-100 d-flex justify-center">
      <WordGroupCard :wordList="mainWordList" />
    </div>
    <!-- 下部セクション（noneの場合は何も表示しない） -->
    <div v-if="lowerContentType !== 'none'" class="w-100 d-flex justify-center">
      <component
        :is="lowerContentType === 'label' ? Label : WordGroupCard"
        v-bind="lowerContentType === 'label' ? lowerLabelProps : { wordList: lowerWordList }"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Label from './Label.vue'
import WordGroupCard from './WordGroupCard.vue'

// サンプルデータをpropsで受け取る想定。今回はローカルで定義
const props = defineProps<{
  wordGroup: any
}>()

// 上部
const upperContentType = computed(() => props.wordGroup.subContents?.upper?.contentType)
const upperLabelProps = computed(() => props.wordGroup.subContents?.upper?.labelSettings || {})
const upperWordList = computed(() => props.wordGroup.subContents?.upper?.wordList || [])

// 下部
const lowerContentType = computed(() => props.wordGroup.subContents?.lower?.contentType)
const lowerLabelProps = computed(() => props.wordGroup.subContents?.lower?.labelSettings || {})
const lowerWordList = computed(() => props.wordGroup.subContents?.lower?.wordList || [])

// 真ん中
const mainWordList = computed(() => props.wordGroup.wordList || [])
</script>
