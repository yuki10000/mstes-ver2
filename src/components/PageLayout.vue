<template>
  <v-app style="background: #f5f5f5; min-height: 100vh;">
    <TopBar @toggle-sidebar="toggleSidebar" />
    <v-main style="background: #f5f5f5; border: none; box-shadow: none;">
      <div style="display: flex;">
        <SideBar v-model="sidebarOpen" />
        <div style="flex: 1;">
          <slot />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TopBar from '@/components/TopBar.vue'
import SideBar from '@/components/SideBar.vue'

const sidebarOpen = ref(true)
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>
