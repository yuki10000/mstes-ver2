<template>
  <v-card class="pa-4 d-flex flex-row justify-center align-center" elevation="2" min-height="100">
    <draggable
      v-model="localList"
      group="words"
      item-key="wordGroupId"
      class="d-flex flex-row flex-nowrap justify-center align-center w-100 h-100"
      style="min-height: 100px; min-width: 100%"
      @update:modelValue="onUpdate"
    >
      <template #item="{ element }">
        <WordGroupSection :wordGroup="element" class="mx-2" />
      </template>
    </draggable>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import WordGroupSection from './WordGroupSection.vue'
import type { WordGroup } from '@/types/exercise'
import { useExerciseStore } from '@/stores/exercise'

const props = defineProps<{ localList: WordGroup[] }>()
const localList = ref<WordGroup[]>(props.localList)
const exerciseStore = useExerciseStore()

watch(
  () => props.localList,
  (val) => {
    localList.value = val
  },
)

function onUpdate(newList: WordGroup[]) {
  exerciseStore.setDraggableWordGroupList(newList)
}
</script>
