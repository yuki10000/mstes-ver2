<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="6" class="mx-auto">
        <v-card elevation="2">
          <v-card-title class="text-h4 text-center">ホーム</v-card-title>
          <v-card-text class="text-center"> ようこそ、段階的和文英訳演習システムへ！ </v-card-text>
          <v-divider class="my-4" />
          <div class="text-center mb-2">
            <div v-if="user && user.email">
              <v-icon class="mr-1" color="primary">mdi-account</v-icon>
              {{ user.email }}
            </div>
          </div>
          <div class="text-center">
            <LogoutButton />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import LogoutButton from '@/features/auth/components/LogoutButton.vue'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>
