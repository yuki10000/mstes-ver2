<template>
  <v-sheet class="d-flex align-center justify-center mx-1 dropzone-sheet" elevation="0" rounded>
    <draggable
      v-model="itemsModel"
      group="words"
      class="flex-grow-1 d-flex align-center justify-center dropzone-draggable"
      :ghost-class="'bg-grey-lighten-3'"
      item-key="id"
      @add="onAdd"
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
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import WordGroupSection from './WordGroupSection.vue'

const emit = defineEmits(['update:items'])
const props = defineProps<{ items: any[] }>()
const itemsModel = ref(props.items)
watch(() => props.items, (val) => { itemsModel.value = val })
watch(itemsModel, (val) => { emit('update:items', val) })

// 1つだけ保持、2つ目が来たら最初のカードをDraggableWordGroupAreaに戻す
function onAdd(evt: any) {
  if (itemsModel.value.length > 1) {
    const removed = itemsModel.value.splice(0, itemsModel.value.length - 1)
    // emitで親に溢れたカードを通知
    emit('dropzone-overflow', removed)
  }
}
</script>
