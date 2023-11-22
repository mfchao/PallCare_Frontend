<script setup lang="ts">
import RegisterForm from "@/components/Login/RegisterForm.vue";
import router from "@/router";


async function goHome() {
  void router.push({ name: "Home" });
}
</script>

<template>
  <main class="centered">
    <button @click="goHome" > BACK</button>

    <h1>Register</h1>
    <section>
        <RegisterForm />

    </section>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>