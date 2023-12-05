<script setup lang="ts">
import router from "@/router";
import { useContactStore } from "@/stores/contact";
import { usePreferenceStore } from "@/stores/preference";

import { ref } from "vue";


const { setOff } = usePreferenceStore();

const { 
    //createPasscode
} = useContactStore();

let passcode1 = ref("");
let passcode2 = ref("");
let passcode3 = ref("");
let passcode4 = ref("");


async function goHome() {
    update();
    setOff();
    void router.push({ name: "Home" });
}

async function back() {
    void router.push({ name: "PreferencePb" });
}

async function update() {
    let passcode = passcode1.value + passcode2.value + passcode3.value + passcode4.value;
//   await createPasscode({ passcode });
}

</script>

<template>
    <main>
      <img @click="back" src="@/assets/images/back.svg"/>
  
    <h2>Want to set a friend passcode?</h2>

    <p>Non-patient users who set you as their patient contact (your family, your friends) need this passcode to activate and view your content.</p>
      
    <input type="password" v-model="passcode1" maxlength="1" size="1">
    <input type="password" v-model="passcode2" maxlength="1" size="1">
    <input type="password" v-model="passcode3" maxlength="1" size="1">
    <input type="password" v-model="passcode4" maxlength="1" size="1">

      <button @click="goHome" > Finish</button>
  
    </main>
  </template>
  
  <style scoped>
  h1 {
    text-align: center;
  }
  </style>