<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

async function logout() {
  await logoutUser();
  void router.push({ name: "Home" });
}

async function delete_() {
  await deleteUser();
  void router.push({ name: "Home" });
}

async function goHome() {
  void router.push({ name: "Home" });
}
</script>

<template>
  <main class="column">
    <img @click="goHome" src="@/assets/images/back.svg" class="back-button"/>

    <h1>Settings for {{ currentUsername }}</h1>
    <button  @click="logout">Logout</button>
    <button class="delete" @click="delete_">Delete User</button>
    <UpdateUserForm />
  </main>
</template>

<style scoped>
.delete {
  background: red
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  height: 100vh; 
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>
