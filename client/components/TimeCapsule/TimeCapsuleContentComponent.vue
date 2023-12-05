<script setup lang="ts">
import { defineEmits, onBeforeMount, ref } from "vue";
import router from "../../router";
import { useTCStore } from "../../stores/timeCapsule";

const { removeFromTimeCapsule } = useTCStore();
const props = defineProps(["delay", "selected"]);
const emit = defineEmits(["deleteContent"]);
const editRoutePath = ref<string>("");
const behaviorTag = props.delay.behavior;

async function deleteContent() {
  await removeFromTimeCapsule(props.delay._id);
  emit("deleteContent");
}

onBeforeMount(async () => {
  switch (props.delay.type) {
    case "Diary":
      editRoutePath.value = `/diary/edit/${props.delay.content}`;
      break;
    case "Letter":
      editRoutePath.value = `/letter/edit/${props.delay.content}`;
      break;
    case "Wish":
      editRoutePath.value = `/wish/edit/${props.delay.content}`;
      break;
  }

  if (props.delay.type == "Diary" && behaviorTag == "send") {
    behaviorTag.value = "reveal";
  }
});
</script>

<template>
  <body @click="router.push({ path: editRoutePath })">
    <p>{{ props.delay.type }}</p>
    <p>{{ props.delay.content }}</p>
    <p>Capsule to {{ behaviorTag }}</p>
    <button @click="deleteContent">Remove</button>
  </body>
</template>

<style scoped></style>
