<template>
  <div class="vueflow-border">
    <VueFlow :nodes="nodes" :edges="edges" fit-view-on-init>
      <template #node-sentence="{ data }">
        <div class="sentence-node">
          <SentenceContainer :wordGroupList="data.sentence.sentenceWordGroupList" />
        </div>
      </template>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import '@vue-flow/core/dist/style.css'
import { computed } from 'vue'
import { VueFlow } from '@vue-flow/core'
import SentenceContainer from './SentenceContainer.vue'
import { useExerciseStore } from '@/stores/exercise'
import { storeToRefs } from 'pinia'

const exerciseStore = useExerciseStore()
const { sentencesList } = storeToRefs(exerciseStore)

const nodes = computed(() =>
  sentencesList.value.map((sentence, idx) => ({
    id: String(idx),
    type: 'sentence',
    position: { x: 100, y: idx * 140 },
    data: { sentence },
  })),
)

const edges = computed(() =>
  sentencesList.value.slice(1).map((_, idx) => ({
    id: `e${idx}-${idx + 1}`,
    source: String(idx),
    target: String(idx + 1),
    type: 'straight',
    animated: true,
    style: { stroke: '#1976d2', strokeWidth: 2 },
  })),
)
</script>

<style scoped>
/* Vue Flowの親要素に確実に高さを与える */
.vueflow-border {
  height: 80vh !important;
  min-height: 400px;
  width: 100%;
  border: 2px solid #1976d2;
  border-radius: 8px;
  background: #f5f7fa;
  box-sizing: border-box;
  margin-top: 16px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
}

.sentence-node {
  min-width: 220px;
  min-height: 60px;
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
</style>
