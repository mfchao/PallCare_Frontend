<script setup lang="ts">
import { defineEmits, onBeforeMount, ref } from "vue";
import router from "../../router";
import { useDelayStore } from "../../stores/delay";
import { useLetterStore } from "../../stores/letter";
import { useNavigationStore } from "../../stores/navigation";
import { formatEntryDate } from "../../utils/formatDate";

const { setNavOff } = useNavigationStore();
const { deletesentLetter, removeunsentletter, getReceiversUsername } = useLetterStore();
const { deleteDelay, getDelayByContent } = useDelayStore();
const props = defineProps(["letter", "boundpatient"]);
const emit = defineEmits(["refreshLetters"]);
let recv = ref("");

onBeforeMount(async () => {
  let receivers = await getReceiversUsername(props.letter.to);
  let receiversstring = receivers.toString();
  recv.value = receiversstring;
});

async function deleteLetterEntry() {
  await deletesentLetter(props.letter._id);
  emit("refreshLetters");
}

async function removeLetterEntry() {
  try {
    const delay = await getDelayByContent(props.letter._id);
    await deleteDelay(delay._id);
  } catch {
    // continue
  }
  await removeunsentletter(props.letter._id);
  emit("refreshLetters");
}

async function enterEdit() {
  await router.push({ path: `/letter/edit/${props.letter._id}` });
  setNavOff();
}
</script>

<template>
  <div class="card">
    <div v-if="!boundpatient" class="top">
      <span v-if="props.letter.send == true" class="ribbon">SENT</span>
      <span v-else class="ribbon2">UNSENT</span>
      <!-- <text class="date" v-if="props.diary.dateCreated !== props.diary.dateUpdated">Edited on: {{ formatEntryDate(props.diary.dateUpdated) }}</text>
      <text class="date" v-else>Created on: {{ formatEntryDate(props.diary.dateCreated) }}</text> -->
      <text class="to">TO: {{ recv.substring(0, 23) + ".." }}</text>
    </div>
    <div v-else class="top2">
      <text>Date: {{ formatEntryDate(props.letter.dateUpdated) }}</text>
    </div>
    <div class="bottom">
      <text v-if="props.letter.content !== null && !boundpatient" class="diarycontent" @click="router.push({ path: `/letter/response/${letter._id}` })">{{
        props.letter.content.substring(0, 90) + ".."
      }}</text>
      <text v-else @click="router.push({ path: `/letter/responseF/${letter._id}` })">{{ props.letter.content.substring(0, 90) + ".." }}</text>
      <div v-if="!boundpatient" class="buttons">
        <button v-if="props.letter.send == false" class="little-black" @click="router.push({ path: `/letter/edit/${letter._id}` })">Edit</button>
        <button v-if="props.letter.send == false" class="little-gray" @click="removeLetterEntry">Remove</button>
        <button v-if="props.letter.send == true" class="little-gray" @click="deleteLetterEntry">Delete</button>
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

p {
  margin: 0em;
}
.top {
  display: flex;
  width: 350px;
  height: 28px;
  padding: 0px -10px;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
}
.top2 {
  display: flex;
  width: 350px;
  height: 28px;
  padding-left: 20px;
  padding: 10px -10px;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
  color: #9fb9c7;
}

.date {
  display: flex;
  width: 207px;
  height: 18px;
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
.diarycontent {
  display: flex;
  width: 190px;
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
.buttons {
  display: flex;
  width: 66px;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;

  flex-shrink: 0;
}
menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.bottom {
  display: flex;
  width: 225px;
  padding: 0px 20px 0px 13px;
  align-items: flex-start;
  gap: 20px;
}

.base article:only-child {
  margin-left: auto;
}

.little-black {
  display: flex;
  width: 75px;
  height: 25px;
  padding: 10px;
  background: #131313;
  font: 100% SF Pro Display;
  font-size: 16px;
}
.ribbon {
  width: 60px;
  font-size: 14px;
  padding: 4px;
  padding-left: 13px;
  padding-right: 13px;
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
.little-gray {
  display: flex;
  width: 75px;
  height: 25px;
  padding: 10px;
  background: rgb(101, 103, 104);
  font: 100% SF Pro Display;
  font-size: 16px;
}
.to {
  display: flex;
  width: 290px;
  height: 18px;
  flex-direction: column;
  justify-content: flex-end;
  flex-shrink: 0;
  color: #000;
  font-family: SF Pro Display;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
}
</style>
