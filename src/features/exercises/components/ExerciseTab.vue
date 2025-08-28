<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <SentenceContainer :wordGroupList="referenceSentenceWordGroupList" />
      </v-col>
      <v-col cols="12">
        <SentenceContainer :wordGroupList="sentenceWordGroupList" @dropzone-overflow="$emit('dropzone-overflow', $event)" @update-dropzone="$emit('update-dropzone', $event)" />
      </v-col>
      <v-col cols="12">
        <DragglableWordGroupArea :localList="draggableWordGroupList" @update-pool="$emit('update-pool', $event)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import SentenceContainer from './SentenceContainer.vue'
import DragglableWordGroupArea from './DragglableWordGroupArea.vue'

const props = defineProps<{
  referenceSentenceWordGroupList: any[],
  sentenceWordGroupList: any[],
  draggableWordGroupList: any[],
}>()
</script>
