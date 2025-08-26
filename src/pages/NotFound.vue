<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="8" lg="6" class="mx-auto">
      <v-card elevation="2">
        <v-card-title class="text-h4 text-center">404 Not Found</v-card-title>
        <v-card-text class="text-center">
          <v-icon size="48" color="grey">mdi-alert-circle-outline</v-icon>
          <div class="my-4">お探しのページは見つかりませんでした。</div>
          <router-link to="/">
            <v-btn variant="outlined" color="primary"> ホームに戻る </v-btn>
          </router-link>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
