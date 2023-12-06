<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

let username = ref("");
let password = ref("");

const { updateUser, updateSession } = useUserStore();

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
</script>

<template>
  <div class="section">
  <h2>Update user details</h2>
  <form @submit.prevent="updateUsername" class="pure-form">
    <fieldset>
      <legend>Change your username</legend>
      <input type="text" placeholder="New username" v-model="username" required />
      <button type="submit" >Update username</button>
    </fieldset>
  </form>

  <form @submit.prevent="updatePassword" class="pure-form">
    <fieldset>
      <legend>Change your password</legend>
      <input type="password" placeholder="New password" v-model="password" required />
      <button type="submit" >Update password</button>
    </fieldset>
  </form>
</div>
</template>


<style>
h2 {
  text-align: center;
  letter-spacing: 0.06em;
  font-size: 0.9em;
  text-transform: uppercase;
}

.section {
margin-top: 30px;
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

input {
  font-size: 14px;
  border-radius: 6px;
  line-height: 1.5;
  padding: 5px 10px;
  transition: box-shadow 100ms ease-in, border 100ms ease-in, background-color 100ms ease-in;
  color: rgb(14, 14, 16);
  background:  rgba(255, 255, 255, 0.5);
  display: block;
  height: 36px;
  -webkit-backdrop-filter: blur(8px);  /* Safari 9+ */
  backdrop-filter: blur(8px); /* Chrome and Opera */
  outline: none;
  outline-width: 0;
  border: none;
  border-width: 0;
  box-shadow: none;
}

button {
  height: 40px;
}


button:hover {
  background:rgba(255, 255, 255, 0.3); 
}
</style>

