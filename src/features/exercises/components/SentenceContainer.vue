<template>
  <v-card class="pa-4 d-flex flex-row justify-center align-center" elevation="3">
    <div class="d-flex flex-row justify-center align-center w-100">
      <WordGroupSection
        v-for="group in props.wordGroupList"
        :key="group.wordGroupId"
        :wordGroup="group"
        class="mx-2"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import WordGroupSection from './WordGroupSection.vue'
const props = defineProps<{ wordGroupList: any[] }>()
</script>
