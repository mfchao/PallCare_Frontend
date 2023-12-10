<script setup lang="ts">
import router from "@/router";
import { usePreferenceStore } from "@/stores/preference";
import { useUserStore } from "@/stores/user";
import { computed, ref } from "vue";

import { storeToRefs } from "pinia";
import PreferenceForm from "../components/Preference/PreferenceForm.vue";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";

const { currentUsername, isFamily } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();
const { updatePreferences, resetStore } = usePreferenceStore();
const { patientUsername, fontSize } = storeToRefs(usePreferenceStore());

const days = ref<number>();

const styleObject = computed(() => ({
      '--font-size': fontSize.value,
}));

async function updateTimeCapsule() {
  await updatePreferences({ timeCapsule: days.value! });
}

async function logout() {
  resetStore();
  await logoutUser();
  void router.push({ name: "Home" });
}

async function delete_() {
  resetStore();
  await deleteUser();
  void router.push({ name: "Home" });
}

async function goHome() {
  void router.push({ name: "Home" });
}
</script>

<template>
  <main class="column">
    <div class="navigation">
      <img @click="goHome" src="@/assets/images/back.svg" class="back-button" />
    </div>
    <h1 :style="styleObject" class="title">Settings</h1>

    <div class="buttons">
      <button @click="logout">Logout</button>
      <button class="delete" @click="delete_">Delete User</button>
    </div>

    <div>
      <UpdateUserForm />
    </div>

    <div v-if="!isFamily">
      <form @submit.prevent="updateTimeCapsule">
        <fieldset>
          <legend :style="styleObject" >Update Time Capsule</legend>
          <input class="custom-input" placeholder="Number of Days" v-model="days" required />
          <button type="submit">Update Days</button>
        </fieldset>
      </form>
    </div>

    <div v-if="!isFamily" class="preferences">
      <p :style="styleObject" >Update User Preferences:</p>
      <PreferenceForm />
    </div>
  </main>
</template>

<style scoped>
.delete {
  background: red;
}

.preferences {
  margin-bottom: 50px;
}

button {
  margin-bottom: 10px;
}
.custom-input {
  border: 2px solid black;
  border-radius: 10px;
  background: transparent;
  padding: 10px;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 150px;
  margin-bottom: 20px;
}
.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  min-height: 100vh;
  padding-top: 60px;
}

.back-button {
  position: absolute;
  top: 40px;
  left: 20px;
}

.title {
  text-align: center;
  height: auto;
  width: 200px;
  margin-bottom: 20px;
}

h3 {
  font-size: var(--font-size);
}

p {
  font-size: var(--font-size);
}

legend {
  font-size: var(--font-size);
}

h1 {
  font-size: var(--font-size);
  line-height: 0;
}
</style>
