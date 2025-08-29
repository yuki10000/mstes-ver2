<template>
  <v-btn color="error" @click="handleLogout" :loading="loading" block>
    ログアウト
  </v-btn>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { loading } = storeToRefs(authStore)
const router = useRouter()

const handleLogout = async () => {
  await authStore.logout()
  router.push({ name: 'Login' })
}
</script>
