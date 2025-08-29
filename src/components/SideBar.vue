<template>
  <v-navigation-drawer v-model="drawer" :permanent="false" :width="240" class="sidebar-light pa-0">
    <v-list>
      <v-list-item to="/" title="ホーム" prepend-icon="mdi-home" />
      <v-list-item to="/users" title="(準備中) ユーザー" prepend-icon="mdi-account-group" />
      <v-list-item
        to="/questions"
        title="(準備中) 問題管理"
        prepend-icon="mdi-file-document-multiple"
      />
      <!-- 必要に応じて他のメニューも追加 -->
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const drawer = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    drawer.value = val
  },
)
watch(drawer, (val) => {
  emit('update:modelValue', val)
})
</script>

<style scoped>
.sidebar-light {
  background-color: #fff !important;
  color: #444 !important;
}
</style>
