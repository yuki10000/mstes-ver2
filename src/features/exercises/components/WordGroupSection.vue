<template>
  <v-container class="pa-0 d-flex flex-column align-center justify-center text-center" fluid>
    <!-- 上部セクション（noneの場合は何も表示しない） -->
    <div v-if="upperContentType !== 'none'" class="mb-1 w-100 d-flex justify-center">
      <component
        :is="upperContentType === 'label' ? Label : WordGroupCard"
        v-bind="upperContentType === 'label' ? upperLabelProps : { wordList: upperWordList }"
      />
    </div>
    <!-- 真ん中のセクション（middleContentTypeで切り替え、noneなら非表示） -->
    <div v-if="middleContentType !== 'none'" class="mb-1 w-100 d-flex justify-center">
      <component
        :is="middleContentType === 'label' ? Label : WordGroupCard"
        v-bind="middleContentType === 'label' ? middleLabelProps : { wordList: middleWordList }"
      />
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
const upperContentType = computed(() => props.wordGroup.contents?.upper?.contentType)
const upperLabelProps = computed(() => props.wordGroup.contents?.upper?.labelSettings || {})
const upperWordList = computed(() => props.wordGroup.contents?.upper?.wordList || [])

// 下部
const lowerContentType = computed(() => props.wordGroup.contents?.lower?.contentType)
const lowerLabelProps = computed(() => props.wordGroup.contents?.lower?.labelSettings || {})
const lowerWordList = computed(() => props.wordGroup.contents?.lower?.wordList || [])

// 真ん中
const middleContentType = computed(() => props.wordGroup.contents?.middle?.contentType)
const middleLabelProps = computed(() => props.wordGroup.contents?.middle?.labelSettings || {})
const middleWordList = computed(() => props.wordGroup.contents?.middle?.wordList || [])
</script>
