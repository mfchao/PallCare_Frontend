<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import router from "../../router";
import { useTCStore } from "../../stores/timeCapsule";
import { formatEntryDate } from "../../utils/formatDate";
const { getReleaseDate } = useTCStore();
let releaseDate = ref<string>();

onBeforeMount(async () => {
  releaseDate.value = formatEntryDate(await getReleaseDate());
});
</script>

<template>
  <button @click="router.push({ name: 'Home' })">Home</button>
  <p>Time Capsule</p>
  <p>Earliest Release Date {{ releaseDate }}</p>
  <button @click="router.push({ name: 'PreferenceP' })">Edit Release Time (via Preferences)</button>
  <button @click="router.push({ name: 'TimeCapsuleContent' })">Edit Contents</button>
</template>
<style></style>
