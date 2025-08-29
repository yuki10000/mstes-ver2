<template>
  <v-form @submit.prevent="login" class="pa-4">
    <v-text-field
      v-model="email"
      label="メールアドレス"
      type="email"
      required
      :disabled="loading"
      prepend-inner-icon="mdi-email"
      class="mb-4"
    />
    <v-text-field
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      label="パスワード"
      required
      :disabled="loading"
      prepend-inner-icon="mdi-lock"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="showPassword = !showPassword"
      class="mb-4"
    />
    <v-btn type="submit" :loading="loading" color="primary" block class="mb-2"> ログイン </v-btn>
    <v-alert v-if="error" type="error" variant="tonal" class="mt-2">
      {{ error }}
    </v-alert>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const { loading, error } = storeToRefs(authStore)

const login = async () => {
  await authStore.login(email.value, password.value)
  if (!error.value) {
    router.push({ name: 'Home' })
  }
}
</script>
