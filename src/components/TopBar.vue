<template>
  <v-app-bar flat elevation="1" class="topbar-light" height="72" style="min-height: 72px; background: #fff; color: #444;">
    <v-app-bar-nav-icon @click="$emit('toggle-sidebar')" />
    <v-toolbar-title class="text-h5">
      <img src="@/assets/logo.png" alt="logo" class="logo-img" />
      段階的翻訳演習
    </v-toolbar-title>
    <v-spacer />
    <div v-if="user && user.email">
      <v-icon class="mr-1">mdi-account</v-icon>
      <span class="mr-4">{{ user.email }}</span>
      <LogoutButton />
    </div>
    <div v-else>
      <!-- ログイン前や認証復元中の表示（例: ローディングアイコンなど） -->
      <v-progress-circular indeterminate color="white" size="24" />
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import LogoutButton from '@/features/auth/components/LogoutButton.vue'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>

<style scoped>
.topbar-light {
  background-color: #fff !important;
  color: #444 !important;
}
.topbar-light .v-toolbar-title,
.topbar-light .v-btn,
.topbar-light .v-icon,
.topbar-light .v-app-bar-title {
  color: #444 !important;
}
.logo-img {
  height: 40px;
  margin-right: 12px;
  vertical-align: middle;
}
</style>
