<template>
  <v-container class="pa-0 d-flex flex-column align-center justify-center text-center" fluid>
    <!-- 上部セクション（noneの場合は何も表示しない） -->
    <div v-if="upperContentType !== 'none'" class="mb-1 w-100 d-flex justify-center">
      <Label v-if="upperContentType === 'label' && upperLabelProps" v-bind="upperLabelProps!" />
      <WordGroupCard v-else-if="upperContentType === 'wordGroupCard' && upperWordList" :wordList="upperWordList!" />
    </div>
    <!-- 真ん中のセクション（middleContentTypeで切り替え、noneなら非表示） -->
    <div v-if="middleContentType !== 'none'" class="mb-1 w-100 d-flex justify-center">
      <Label v-if="middleContentType === 'label' && middleLabelProps" v-bind="middleLabelProps!" />
      <WordGroupCard v-else-if="middleContentType === 'wordGroupCard' && middleWordList" :wordList="middleWordList!" />
    </div>
    <!-- 下部セクション（noneの場合は何も表示しない） -->
    <div v-if="lowerContentType !== 'none'" class="w-100 d-flex justify-center">
      <Label v-if="lowerContentType === 'label' && lowerLabelProps" v-bind="lowerLabelProps!" />
      <WordGroupCard v-else-if="lowerContentType === 'wordGroupCard' && lowerWordList" :wordList="lowerWordList!" />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Label from './WordGroupLabelLabel.vue'
import WordGroupCard from './WordGroupCard.vue'

import type { WordGroup, WordItem, LabelSettings } from '@/features/exercises/types/exercise'
const props = defineProps<{ wordGroup: WordGroup }>()

// 上部
const upperContentType = computed(() => props.wordGroup.contents?.upper?.contentType)
const upperLabelProps = computed<LabelSettings|undefined>(() => props.wordGroup.contents?.upper?.labelSettings)
const upperWordList = computed<WordItem[]|undefined>(() => props.wordGroup.contents?.upper?.wordList)

const lowerContentType = computed(() => props.wordGroup.contents?.lower?.contentType)
const lowerLabelProps = computed<LabelSettings|undefined>(() => props.wordGroup.contents?.lower?.labelSettings)
const lowerWordList = computed<WordItem[]|undefined>(() => props.wordGroup.contents?.lower?.wordList)

const middleContentType = computed(() => props.wordGroup.contents?.middle?.contentType)
const middleLabelProps = computed<LabelSettings|undefined>(() => props.wordGroup.contents?.middle?.labelSettings)
const middleWordList = computed<WordItem[]|undefined>(() => props.wordGroup.contents?.middle?.wordList)
</script>
