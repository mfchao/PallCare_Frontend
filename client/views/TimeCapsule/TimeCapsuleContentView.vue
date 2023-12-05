<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import TimeCapsuleContentComponent from "../../components/TimeCapsule/TimeCapsuleContentComponent.vue";
import router from "../../router";
import { useTCStore } from "../../stores/timeCapsule";
import { useUserStore } from "../../stores/user";

const loaded = ref(false);
const { getSelectContent } = useTCStore();
const { currentUsername } = storeToRefs(useUserStore());
let delays = ref<Array<Record<string, string>>>([]);

async function getTimeCapsule() {
  delays.value = await getSelectContent(currentUsername.value);
}

onBeforeMount(async () => {
  await getTimeCapsule();
  loaded.value = true;
});
</script>

<template>
  <button @click="router.push({ name: 'Home' })">Home</button>
  <h1>Capsule Content</h1>
  <button @click="router.push({ name: 'CreateLetter' })">Create a new letter to store in Time Capsule</button>
  <article v-for="delay in delays" :key="delay._id">
    <TimeCapsuleContentComponent :delay="delay" @deleteContent="getTimeCapsule" />
  </article>
</template>
<style></style>
