<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";

const username = ref("");
const password = ref("");

async function register() {

  void router.push({ 
    name: "AccountType", 
    params: { 
      username: username.value, 
      password: password.value 
    } 
  });

}
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="register">
    <h3>Register User</h3>
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
        <button type="submit" class="pure-button pure-button-primary" >Register</button>
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
