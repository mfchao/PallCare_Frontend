<script setup lang="ts">

import router from "@/router";


async function goHome() {
  void router.push({ name: "Home" });
}
</script>

<template>
  <main>
    <h1>Preference View Patient</h1>
    <section>
      <!-- <h1 v-if="isLoggedIn">Welcome {{ currentUsername }}!</h1>
      <h1 v-else>Please login!</h1> -->
      content...

    </section>
    <button @click="goHome" > Finish</button>

  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>