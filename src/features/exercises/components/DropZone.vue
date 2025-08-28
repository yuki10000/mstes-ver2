<template>
  <v-sheet class="d-flex align-center justify-center mx-1 dropzone-sheet" elevation="0" rounded>
    <draggable
      v-model="itemsModel"
      @change="onDropOrChange"
      group="words"
      class="flex-grow-1 d-flex align-center justify-center dropzone-draggable"
      item-key="wordGroupId"
    >
      <template #item="{ element }">
        <WordGroupSection :wordGroup="element" class="mx-2" />
      </template>
    </draggable>
  </v-sheet>
</template>

<style scoped>
.dropzone-sheet {
  min-width: 180px;
  min-height: 70px;
  border: 2px dashed #bdbdbd;
}
.dropzone-draggable {
  width: 100%;
  min-height: 36px;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import WordGroupSection from './WordGroupSection.vue'
import type { WordGroup } from '@/types/exercise'

const props = defineProps<{ items: WordGroup[]; dropzoneId: number }>()
import { useExerciseStore } from '@/stores/exercise'
const exerciseStore = useExerciseStore()

const itemsModel = ref<WordGroup[]>(props.items)

function onDropOrChange() {
  // itemsModel.valueが新しい配列
  exerciseStore.updateItemsById(props.dropzoneId, itemsModel.value)
}
</script>
