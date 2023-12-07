<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import DiaryComponent from "../../components/Diary/DiaryComponent.vue";
import WishComponent from "../../components/Wish/WishComponent.vue";
import router from "../../router";
import { useTCStore } from "../../stores/timeCapsule";
import { useUserStore } from "../../stores/user";

const { getUnselectedContent } = useTCStore();
const { currentUsername } = storeToRefs(useUserStore());
const emit = defineEmits(["refreshContent"]);
let diaries = ref<Array<Record<string, string>>>([]);
let wishes = ref<Array<Record<string, string>>>([]);

async function refreshDiaries(_id: string) {
  diaries.value = diaries.value.filter((diary) => diary._id !== _id);
  emit("refreshContent");
}

async function refreshWishes(_id: string) {
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
    <button @click="router.push({ path: `/letter/create/${true}` })">Create a new letter to store in Time Capsule</button>
    <h1>Select Diaries to Add to Time Capsule</h1>
    <article v-for="diary in diaries" :key="diary._id">
      <!-- TODO: add DIARY component w/ conditional styling -->
      <DiaryComponent :diary="diary" :capsule="true" @refreshDiaries="refreshDiaries(diary._id)" />
    </article>
    <h1>Select Wishes to Add to Time Capsule</h1>
    <article v-for="wish in wishes" :key="wish._id">
      <!-- TODO: add WISH component w/ conditional styling -->
      <Suspense>
        <WishComponent :wish="wish" :capsule="true" @refreshWishes="refreshWishes(wish._id)" />
      </Suspense>
    </article>
  </body>
</template>

<style scoped></style>
