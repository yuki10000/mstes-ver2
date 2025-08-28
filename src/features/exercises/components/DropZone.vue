<template>
  <v-sheet class="d-flex align-center justify-center mx-1 dropzone-sheet" elevation="0" rounded>
    <draggable
      v-model="itemsModel"
      group="words"
      class="flex-grow-1 d-flex align-center justify-center dropzone-draggable"
      item-key="id"
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
import type { WordGroup } from '@/features/exercises/types/exercise'

const props = defineProps<{ items: WordGroup[] }>()
const itemsModel = ref<WordGroup[]>(props.items)
</script>
