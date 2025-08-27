<template>
  <v-sheet class="d-flex align-center justify-center mx-1 dropzone-sheet" elevation="0" rounded>
    <draggable
      v-model="items"
      class="flex-grow-1 d-flex align-center justify-center dropzone-draggable"
      :group="'words'"
      :ghost-class="'bg-grey-lighten-3'"
      item-key="id"
    >
      <template #item="{ element }">
        <slot :item="element" />
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

// ドロップされるアイテムのリスト（親から渡す場合はpropsに変更）
const items = ref<any[]>([])
</script>
