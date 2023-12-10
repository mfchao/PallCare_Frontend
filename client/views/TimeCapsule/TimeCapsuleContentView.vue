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
  <body>
  <div class="navigation">
    <img @click="router.push({ name: 'TimeCapsule' })" src="@/assets/images/back.svg" />
    <text class="pagetitle">TIME MACHINE contents</text>
  </div>
  <div class="pageexplainationdiv">
      <text class="pageexplaination">
      1. Create a letter and set it to be sent at activation date
      <br>2. Set an existed diary to be deleted or published at activation date
      <br>3. Create a new wish and set it to be published at activation date
      </text>
    </div>
    <div class="creatediv" @click="router.push({ name: 'TimeCapsuleAdd' })" @refreshContent="getTimeCapsule">
      <text class="createdivtitle">Select contents here</text>
      <div class="blank">
        <img src="@/assets/images/diaryicon.png" style="height: 200%; width: fit-content" />
      </div>
    </div>
    <div class="previousDiarytitle">
      <text class="previousDiary">Selected Contents</text>
      <input type="text" class="diarysearchbar" placeholder="Search" />
    </div>
    <p v-if="delays.length===0">you have no capsule contents yet</p>
  <article v-for="delay in delays" :key="delay._id">
    <TimeCapsuleContentComponent :delay="delay" @deleteContent="getTimeCapsule" />
  </article>
  </body>
</template>
<style scoped>
  body {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 60px 18px 120px 18px;
    justify-content: space-between;
    flex-direction: column;
    background:#F0E7D8;
    gap: 15px;
  }
  .navigation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.pagetitle{
  display: flex;
  width: 240px;
  height: 45px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #131313;
  font-family: New York;
  font-size: 25px;
  font-style: normal;
  font-weight: 496;
  line-height: normal;
  text-transform: uppercase;
}

.creatediv {
  display: flex;
  width: 290px;
  height: 89px;
  padding-left: 14px;
  align-items: center;
  gap: 39px;
  flex-shrink: 0;
  border-radius: var(--numbers-spacing-12, 12px);
  background: #9fb9c7;
}

.createdivtitle {
  display: flex;
  width: 162px;
  height: 57px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #000;
  font-family: SF Pro Display;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 103.822%;
}

.blank {
  display: flex;
  width: 68px;
  height: 62px;
  align-items: flex-end;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 7px;
  background-color: #f0e7d8;
}
.pageexplainationdiv{
  height: 110px;
}
.pageexplaination{
  font-size: 15px;
}

.previousDiarytitle {
  display: flex;
  height: 46px;
  align-items: left;
  gap: 20px;
  padding-top: 10px;
}

.previousDiary {
  display: flex;
  width: 271px;
  height: 35px;
  flex-direction: column;
  justify-content: center;
  color: #000;
  font-family: SF Pro Display;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.diarysearchbar {

  width: 2px;
  height: 26px;
  padding: 0px 7px;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  border-radius: var(--numbers-spacing-12, 12px);
  border: 1.3px solid #000;
  background: #f0e7d8;
  opacity: 0;
}
</style>
