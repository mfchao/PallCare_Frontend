<script setup lang="ts">
import { usePreferenceStore } from "@/stores/preference";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";
const { getPreferences } = usePreferenceStore();
const { patientUsername } = storeToRefs(usePreferenceStore());

let username = ref("");
let password = ref("");
let fontSize = ref("");

const { updateUser, updateSession } = useUserStore();
const styleObject = computed(() => ({
  "--font-size": fontSize.value,
}));
async function updateUsername() {
  await updateUser({ username: username.value });
  await updateSession();
  username.value = "";
}

async function updatePassword() {
  await updateUser({ password: password.value });
  await updateSession();
  password.value = "";
}
onBeforeMount(async () => {
  fontSize.value = (await getPreferences()).fontSize;
});
</script>

<template>
  <div class="section">
    <form @submit.prevent="updateUsername">
      <fieldset>
        <legend :style="styleObject">Change your username</legend>
        <input class="custom-input" type="text" placeholder="New username" v-model="username" required />
        <button type="submit">Update username</button>
      </fieldset>
    </form>

    <form @submit.prevent="updatePassword">
      <fieldset>
        <legend :style="styleObject">Change your password</legend>
        <input class="custom-input" type="password" placeholder="New password" v-model="password" required />
        <button type="submit">Update password</button>
      </fieldset>
    </form>
  </div>
</template>

<style>
fieldset {
  border: none;
}

h2 {
  text-align: center;
  letter-spacing: 0.06em;
  font-size: 0.9em;
  text-transform: uppercase;
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

form {
  display: flex;
  gap: 0.5em;
  align-items: center;
  padding-left: 1em;
  padding-top: 0.5em;
}

legend {
  text-align: left;
  font-size: 0.9em;
}

button {
  height: 40px;
}

legend {
  font-size: var(--font-size);
}

button:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
