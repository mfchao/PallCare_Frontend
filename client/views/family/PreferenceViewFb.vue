<script setup lang="ts">
import router from "@/router";
import { usePreferenceStore } from "@/stores/preference";


const { setOff } = usePreferenceStore();


async function goHome() {
    setOff();
    void router.push({ name: "Home" });
}

async function back() {
    void router.push({ name: "PreferenceP" });
}

</script>

<template>
    <main>
      <img @click="back" src="@/assets/images/back.svg"/>
  
    <h2>Thanks for sharing!</h2>

    <p>We provide patient-centered communication system with multiple features, sign in and start your journey to know more</p>      
    <div>
        <div>
            <img src="@/assets/images/placeholder.svg"/>
            <p>Time Capsule</p>
        </div>
        <div>
            <img src="@/assets/images/placeholder.svg"/>
            <p>One-way Letter</p>
        </div>
        <div>
            <img src="@/assets/images/placeholder.svg"/>
            <p>Semi-Public Diary</p>
        </div>
        <div>
            <img src="@/assets/images/placeholder.svg"/>
            <p>Mood Tracking</p>
        </div>
        <div>
            <img src="@/assets/images/placeholder.svg"/>
            <p>Post Sharing Forum</p>
        </div>
        <div>
            <img src="@/assets/images/placeholder.svg"/>
            <p>Shared Wishlist</p>
        </div>
    </div>
    <button @click="goHome" > Finish</button>
  
    </main>
  </template>
  
  <style scoped>
  h1 {
    text-align: center;
  }
  </style>