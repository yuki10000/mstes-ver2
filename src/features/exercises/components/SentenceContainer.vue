<template>
  <v-card class="pa-4 d-flex flex-row justify-center align-center" elevation="3">
    <div class="d-flex flex-row justify-center align-center w-100">
      <WordGroupSection
        v-for="group in props.wordGroupList"
        :key="group.wordGroupId"
        :wordGroup="group"
        class="mx-2"
        @update-dropzone="onUpdateDropZone"
        @dropzone-overflow="onDropZoneOverflow"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import WordGroupSection from './WordGroupSection.vue'
const emit = defineEmits(['update-dropzone', 'dropzone-overflow'])
const props = defineProps<{ wordGroupList: any[] }>()

function onUpdateDropZone(payload: any) {
  emit('update-dropzone', payload)
}
function onDropZoneOverflow(payload: any) {
  emit('dropzone-overflow', payload)
}
</script>
