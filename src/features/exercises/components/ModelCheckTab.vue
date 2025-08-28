<template>
	<v-container fluid>
		<v-row>
			<v-col cols="12">
				<div v-for="sentence in sentenceList" :key="sentence.sentenceId" class="mb-6">
					<SentenceContainer :wordGroupList="sentence.sentenceWordGroupList" />
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import sentenceList from './sentenceList'
import SentenceContainer from './SentenceContainer.vue'
</script>
