<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import router from "../../router";
import { useTCStore } from "../../stores/timeCapsule";
import { useUserStore } from "../../stores/user";

const { getUnselectedContent, addToTimeCapsule } = useTCStore();
const { currentUsername } = storeToRefs(useUserStore());
const emit = defineEmits(["refreshContent"]);
const diaries = ref<Array<Record<string, string>>>([]);
const wishes = ref<Array<Record<string, string>>>([]);

async function refreshDiaries(_id: string, behavior: "send" | "delete") {
  await addToTimeCapsule(currentUsername.value, _id, "Diary", behavior);
  diaries.value = diaries.value.filter((diary) => diary._id !== _id);
  emit("refreshContent");
}

async function refreshWishes(_id: string, behavior: "send" | "delete") {
  await addToTimeCapsule(currentUsername.value, _id, "Wish", behavior);
  wishes.value = wishes.value.filter((wish) => wish._id !== _id);
  emit("refreshContent");
}

onBeforeMount(async () => {
  const unselectedContent = await getUnselectedContent(currentUsername.value);
  diaries.value = unselectedContent.diaries;
  wishes.value = unselectedContent.wishes;
});
</script>
<template>
  <body>
    <button @click="router.push({ name: 'TimeCapsuleContent' })">back</button>
    <h1>Add Contents</h1>
    <button @click="router.push({ name: 'CreateLetter' })">Create a new letter to store in Time Capsule</button>
    <h1>Select Diaries to Add to Time Capsule</h1>
    <article v-for="diary in diaries" :key="diary._id">
      <!-- TODO: add DIARY component w/ conditional styling -->
      <button @click="refreshDiaries('fake id', 'send')"></button>
    </article>
    <h1>Select Wishes to Add to Time Capsule</h1>
    <article v-for="wish in wishes" :key="wish._id">
      <!-- TODO: add WISH component w/ conditional styling -->
      <button @click="refreshWishes('fake id', 'send')"></button>
    </article>
  </body>
</template>

<style scoped></style>
