<script setup lang="ts">
import router from "@/router";
import { useMoodStore } from "@/stores/mood";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { usePreferenceStore } from "../../stores/preference";

import { ref } from "vue";
const isLoading = ref(true);

const username = ref("");
const password = ref("");
const { loginUser, updateSession,getUserType } = useUserStore();
const { refreshMood } = useMoodStore();
const { isFamily } = storeToRefs(useUserStore());
const { patientUsername } = storeToRefs(usePreferenceStore());



async function login() {
  await loginUser(username.value, password.value);
  void updateSession();

  await getUserType(username.value);

  
  void router.push({ name: "Home" });
}
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="login">
    <h3>Login</h3>
    <fieldset>
      <div class="pure-control-group">
        <label for="aligned-name">Username</label>
        <input v-model.trim="username" type="text" id="aligned-name" placeholder="Username" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-password">Password</label>
        <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
      </div>
      <div class="pure-controls">
        <button type="submit" class="pure-button pure-button-primary">Submit</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
}
</style>
