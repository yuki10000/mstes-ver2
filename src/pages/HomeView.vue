<template>
  <PageLayout>
    <v-row justify="center" align="center">
      <v-col cols="6" class="d-flex justify-center">
        <v-card style="width: 400px; height: 500px; margin: 48px 0" elevation="4">
          <v-card-title class="text-h5">デモ</v-card-title>
          <v-card-subtitle>2問程度の簡単な問題を体験できます。</v-card-subtitle>
          <v-container class="my-2" fluid style="height: 320px;">
            <v-row
              align="center"
              justify="center"
              style="height: 100%;"
            >
              <v-col cols="12" class="d-flex flex-column align-center justify-center">
                <v-icon size="100" color="primary" class="mb-6">mdi-play-circle</v-icon>
                <v-btn color="primary" @click="dialog = true">デモを始める</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-dialog v-model="dialog" max-width="400">
          <v-card>
            <v-card-title>デモを選択</v-card-title>
            <v-card-text>
              <v-select
                v-model="selectedDemo"
                :items="demoOptions"
                item-title="text"
                item-value="value"
                label="デモを選択してください"
                outlined
                dense
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" :disabled="!selectedDemo" @click="openDemo">開く</v-btn>
              <v-btn text @click="dialog = false">閉じる</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="6" class="d-flex justify-center">
        <v-card style="width: 400px; height: 500px; margin: 48px 0" elevation="4">
          <v-card-title class="text-h5">演習（準備中）</v-card-title>
          <v-card-subtitle>準備中のため、もうしばらくお待ちください。</v-card-subtitle>
          <v-container class="my-2" fluid style="height: 320px;">
            <v-row
              align="center"
              justify="center"
              style="height: 100%;"
            >
              <v-col cols="12" class="d-flex flex-column align-center justify-center">
                <v-icon size="100" color="secondary" class="mb-6">mdi-school</v-icon>
                <v-btn color="secondary" disabled>演習を始める</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageLayout from '@/components/PageLayout.vue'

const dialog = ref(false)
const selectedDemo = ref('')
const demoOptions = [
  { text: 'Demo1', value: 'room1' },
  { text: 'Demo2', value: 'room2' },
]

const openDemo = () => {
  if (selectedDemo.value) {
    window.open(`/demo/${selectedDemo.value}`, '_blank')
    dialog.value = false
  }
}
</script>
