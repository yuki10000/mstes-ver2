<template>
  <v-dialog :model-value="modelValue" @update:model-value="onUpdateModelValue" max-width="400">
    <v-card>
      <v-card-title class="text-h6 text-center">
        <v-icon :color="isCorrect ? 'success' : 'error'" size="36">
          {{ isCorrect ? 'mdi-check-circle' : 'mdi-close-circle' }}
        </v-icon>
        <span class="ml-2">{{ isCorrect ? '正解です！' : '不正解です' }}</span>
      </v-card-title>
      <v-card-text class="text-center">
        <div v-if="!isCorrect" class="mt-2">
          <span>あなたの回答: </span>
          <span class="font-weight-bold">{{ answerString }}</span>
        </div>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn v-if="isCorrect" color="primary" @click="$emit('next')">次の問題に進む</v-btn>
        <v-btn v-else color="primary" @click="$emit('close')">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
defineProps({
  modelValue: Boolean,
  isCorrect: Boolean,
  answerString: String,
})

const emit = defineEmits(['close', 'update:modelValue', 'next'])

function onUpdateModelValue(val: boolean) {
  if (!val) emit('close')
}
</script>
