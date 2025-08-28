<template>
  <div class="d-flex flex-column align-center">
    <v-divider v-if="isLineUpper" :thickness="2" length="200" class="mt-1 mb-1" />
    <span class="text-body-1 font-weight-medium">{{ labelText }}</span>
    <v-divider v-if="isLineLower" :thickness="2" length="200" class="mt-1 mb-1"></v-divider>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  labelText: string
  isLineUpper?: boolean
  isLineLower?: boolean
}>()
</script>
