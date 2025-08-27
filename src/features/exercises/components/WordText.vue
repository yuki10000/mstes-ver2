<template>
  <span class="text-body-1 mx-2">
    {{ wordText }}
  </span>
</template>

<script setup lang="ts">
defineProps<{ wordText: string }>()
</script>
