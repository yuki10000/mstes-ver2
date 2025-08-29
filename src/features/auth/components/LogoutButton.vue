<template>
  <v-btn icon color="primary" @click="dialog = true" :loading="loading" aria-label="ログアウト">
    <v-icon>mdi-logout</v-icon>
  </v-btn>
  <v-dialog v-model="dialog" max-width="320">
    <v-card>
      <v-card-title class="text-h6 text-center">ログアウトしますか？</v-card-title>
      <v-card-actions class="justify-center" style="gap: 16px">
        <v-btn color="black" @click="dialog = false">キャンセル</v-btn>
        <v-btn color="primary" @click="confirmLogout">はい</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const dialog = ref(false)
const authStore = useAuthStore()
const { loading } = storeToRefs(authStore)
const router = useRouter()

const confirmLogout = async () => {
  dialog.value = false
  await authStore.logout()
  router.push({ name: 'Home' })
}
</script>
