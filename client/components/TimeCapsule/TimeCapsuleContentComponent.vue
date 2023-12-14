<script setup lang="ts">
import { defineEmits, onBeforeMount, ref } from "vue";
import router from "../../router";
import { useDiaryStore } from "../../stores/diary";
import { useLetterStore } from "../../stores/letter";
import { useTCStore } from "../../stores/timeCapsule";
import { useWishStore } from "../../stores/wish";

const { removeFromTimeCapsule } = useTCStore();
const { getDiaryById } = useDiaryStore();
const { getWishById } = useWishStore();
const { getLetterById } = useLetterStore();
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
  try {
    content.value = (await getDiaryById(delay.content)).content;
  } catch {
    await deleteContent();
  }
  editRoutePath.value = `/diary/edit/${delay.content}`;
  behaviorTag.value = props.delay.behavior === "send" ? "reveal" : "delete";
}

async function initWishComponent() {
  const delay = props.delay;
  try {
    content.value = (await getWishById(delay.content)).content;
  } catch {
    await deleteContent();
  }
  // editRoutePath.value = `/wish/edit/${delay.content}`;
  editRoutePath.value = `/time_capsule/content`;
  behaviorTag.value = props.delay.behavior;
}

async function initLetterComponent() {
  const delay = props.delay;
  try {
    content.value = (await getLetterById(delay.content)).content;
  } catch {
    await deleteContent();
  }
  editRoutePath.value = `/letter/edit/${props.delay.content}`;
  behaviorTag.value = props.delay.behavior;
}

onBeforeMount(async () => {
  switch (props.delay.type) {
    case "Diary":
      await initDiaryComponent();
      break;
    case "Wish":
      await initWishComponent();
      break;
    case "Letter":
      await initLetterComponent();
      break;
  }
});
</script>

<template>
  <div>
    <div class="card">
      <div class="top" @click="router.push({ path: editRoutePath })">
        <span v-if="props.delay.type == 'Wish'" class="ribbon">WISH</span>
        <span v-if="props.delay.type == 'Diary'" class="ribbon2">DIARY</span>
        <span v-if="props.delay.type == 'Letter'" class="ribbon3">LETTER</span>
        <text class="date">Capsule to {{ behaviorTag }}</text>
      </div>
      <div class="bottom">
        <text class="diarycontent">{{ content.substring(0, 90) + ".." }}</text>
        <button class="little-black-capsule" @click="deleteContent">Remove</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  width: 300px;
  height: 95px;
  padding: 1.5px 0px 9px 1.5px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: var(--numbers-spacing-12, 12px);
  border: 1.5px solid #000;
}
.top {
  display: flex;
  width: 350px;
  height: 28px;
  padding: 0px -10px;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
.ribbon {
  width: 60px;
  font-size: 14px;
  padding: 4px;
  position: relative;
  left: -10px;
  box-shadow: 2px 2px 6px #9d9c9c;
  text-align: center;
  border-radius: 25px;
  transform: rotate(-20deg);
  background-color: #edb4c7;
  color: white;
}
.ribbon2 {
  width: 60px;
  font-size: 14px;
  padding: 4px;
  position: relative;
  left: -10px;
  box-shadow: 2px 2px 6px #9d9c9c;
  text-align: center;
  border-radius: 25px;
  transform: rotate(-20deg);
  background-color: #9fb9c7;
  color: rgb(0, 0, 0);
}
.ribbon3 {
  width: 60px;
  font-size: 14px;
  padding: 4px;
  position: relative;
  left: -10px;
  box-shadow: 2px 2px 6px #9d9c9c;
  text-align: center;
  border-radius: 25px;
  transform: rotate(-20deg);
  background-color: #ff4d9d;
  color: rgb(255, 255, 255);
}
.date {
  display: flex;
  width: 207px;
  height: 15px;
  flex-direction: column;
  justify-content: flex-end;
  flex-shrink: 0;
  color: #000;
  font-family: SF Pro Display;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 82.938%;
}
.bottom {
  display: flex;
  width: 225px;
  padding: 0px 20px 0px 13px;
  align-items: flex-start;
  gap: -2px;
}
.diarycontent {
  display: flex;
  width: 180px;
  height: 45px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #8d8989;
  font-family: SF Pro Display;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.little-black-capsule {
  display: flex;
  width: 95px;
  height: 35px;
  background: #7c7c7c;
  font: 100% SF Pro Display;
  font-weight: 500;
  line-height: 90%;
  font-size: 16px;
  border-radius: 20px;
}
</style>
