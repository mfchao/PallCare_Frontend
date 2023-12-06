<script setup lang="ts">
import { defineEmits, onBeforeMount, ref } from "vue";
import router from "../../router";
import { useDiaryStore } from "../../stores/diary";
import { useTCStore } from "../../stores/timeCapsule";

const { removeFromTimeCapsule } = useTCStore();
const { getDiaryById } = useDiaryStore();
const props = defineProps(["delay", "selected"]);
const emit = defineEmits(["deleteContent"]);
const editRoutePath = ref("");
const behaviorTag = ref("");
let content = ref("");

async function deleteContent() {
  await removeFromTimeCapsule(props.delay._id);
  emit("deleteContent");
}
async function initDiaryComponent() {
  const delay = props.delay;
  editRoutePath.value = `/diary/edit/${delay.content}`;
  content.value = (await getDiaryById(delay.content)).content;
  behaviorTag.value = props.delay.behavior === "send" ? "reveal" : "delete";
}

// async function getWishContent() {

// }

// async function getLetterContent() {

// }

onBeforeMount(async () => {
  switch (props.delay.type) {
    case "Diary":
      return await initDiaryComponent();
    case "Letter":
      editRoutePath.value = `/letter/edit/${props.delay.content}`;
      break;
    case "Wish":
      editRoutePath.value = `/wish/edit/${props.delay.content}`;
      break;
  }

  if (props.delay.type === "Diary" && behaviorTag.value === "send") {
    behaviorTag.value = "reveal";
  }
});
</script>

<template>
  <body @click="router.push({ path: editRoutePath })">
    <p>{{ props.delay.type }}</p>
    <p>{{ content }}</p>
    <p>Capsule to {{ behaviorTag }}</p>
  </body>
  <button @click="deleteContent">Remove</button>
</template>

<style scoped></style>
