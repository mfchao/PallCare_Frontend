<script setup lang="ts">
import { ObjectId } from "mongodb";
import { onBeforeMount, ref } from "vue";
import router from "../../router";
import { useDelayStore } from "../../stores/delay";
import { useNavigationStore } from "../../stores/navigation";
import { useTCStore } from "../../stores/timeCapsule";
import { useUserStore } from "../../stores/user";
import { useWishStore } from "../../stores/wish";
import { fetchy } from "../../utils/fetchy";

const { setNavOn } = useNavigationStore();
const { getWishById } = useWishStore();
const { currentUsername } = useUserStore();
const { getDelayByContent, deleteDelay, updateDelay } = useDelayStore();
const { addToTimeCapsule } = useTCStore();
const props = defineProps(["_id"]);
const content = ref("");
const visibility = ref("");
const hidden = ref(false);
const emit = defineEmits(["editWish", "refreshWishes"]);
let prevDelayId = ref<ObjectId>();
let timeCapsule = ref<boolean>(false);
let behaviorIsSend = ref<boolean>(false);

function resetBehaviorOptions() {
  if (!hidden.value) {
    behaviorIsSend.value = false;
  }
}
async function editTimeCapsule() {
  // new addition to capsule
  if (timeCapsule.value) {
    if (!prevDelayId.value) {
      await addToTimeCapsule(currentUsername, props._id, "Diary", behaviorIsSend.value ? "send" : "delete");
    } else {
      await updateDelay(prevDelayId.value, { behavior: behaviorIsSend.value ? "send" : "delete" });
    }
  } // was in capsule, and now it is deseleted
  else if (prevDelayId.value) {
    await deleteDelay(prevDelayId.value);
  }
}

const editWish = async () => {
  try {
    await fetchy(`/api/wishes/${props._id}`, "PATCH", { body: { update: { content: content.value, visibility: visibility.value } } });
  } catch (e) {
    return;
  }
  await editTimeCapsule();
  emit("editWish");
  emit("refreshWishes");
  await returnToWish();
};

async function returnToWish() {
  await router.push({ name: "Wish" });
  setNavOn();
}

onBeforeMount(async () => {
  const wish = await getWishById(props._id);
  content.value = wish.content;
  visibility.value = wish.visibility;
  hidden.value = visibility.value === "private";

  try {
    const delay = await getDelayByContent(props._id);
    prevDelayId.value = delay._id;
    timeCapsule.value = true;
    behaviorIsSend.value = delay.behavior === "send";
  } catch {
    // catch if there not currently in time capsule --> do nothing
  }
});
</script>

<template>
  <div class="navigation">
    <img @click="returnToWish()" src="@/assets/images/back.svg" />
    <h1>Edit Wish</h1>
  </div>
  <form class="create-form" @submit.prevent="editWish">
    <div calss="inputspace">
      <textarea class="wish-content" id="content" v-model="content" required></textarea>
    </div>
    <div class="setting">
      <div class="field-title">
        <p class="setting-title">Settings</p>
        <span class="badge">?</span>
      </div>
      <fieldset class="wish-fields" :style="{ height: timeCapsule ? '150px' : '120px' }">
        <div class="left">
          <!-- Private setting -->
          <div class="options">
            <p class="form-subtitle">Private</p>
            <label class="switch">
              <input type="radio" id="private" name="visibility" value="private" v-model="visibility" @change="resetBehaviorOptions" />
              <span class="slider round"></span>
            </label>
          </div>
          <div class="options">
            <p class="form-subtitle">Contacts Only</p>
            <label class="switch">
              <input type="radio" id="contacts" name="visibility" value="contacts" v-model="visibility" @change="resetBehaviorOptions" />
              <span class="slider round"></span>
            </label>
          </div>
          <div class="options">
            <p class="form-subtitle">Public</p>
            <label class="switch">
              <input type="radio" id="public" name="visibility" value="public" v-model="visibility" @change="resetBehaviorOptions" />
              <span class="slider round"></span>
            </label>
          </div>
          <!-- TIme capsule setting -->
          <div class="options">
            <p class="form-subtitle">Add to Time Machine</p>
            <label class="switch">
              <input type="checkbox" v-model="timeCapsule" />
              <span class="slider round"></span>
            </label>
          </div>
          <div class="options" v-if="timeCapsule">
            <p class="form-subtitle">Behavior</p>
            <label class="switch" v-if="timeCapsule">
              <input type="checkbox" v-model="behaviorIsSend" :disabled="!hidden" />
              <span class="slider round"></span>
            </label>
            <p class="form-subtitle">{{ behaviorIsSend ? "Send" : "Delete" }}</p>
          </div>
        </div>
      </fieldset>
    </div>
    <button type="submit" class="bluebuttoncenterlong">Save</button>
  </form>
</template>

<style scoped>
.setting {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.field-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.setting-title {
  font-family: New York;
  font-style: normal;
  font-weight: 496;
  font-size: 20px;
  line-height: 24px;
  color: #131313;
}
.navigation {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 20%;
}
.inputspace {
  display: flex;
  width: 300px;
  height: 290px;
  padding-top: 10px;
  /* padding-bottom: 0px; */
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-space-075, 6px);
  border-radius: var(--numbers-spacing-12, 12px);
  background: #9fb9c7;
}
textarea.wish-content {
  display: flex;
  width: 260px;
  height: 226px;
  padding: 10px 11px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
}
.create-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.wish-fields {
  display: flex;
  width: 290px;
  height: 120px;
  padding: 10px 0px 10px 10px;
  align-items: column;
  gap: 13px;
  flex-shrink: 0;
  border-radius: var(--numbers-spacing-12, 12px);
  border: 1.5px solid #000;
}
.left {
  gap: 12px;
}
.options {
  display: flex;
  align-items: center;
  gap: 22px;
}

.form-subtitle {
  color: #000;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 500;
  height: 1px;
  line-height: 0;
  /* line-height: 103.822%; 13.497px */
}
</style>
