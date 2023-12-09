<script setup lang="ts">
import router from "@/router";
import { useContactStore } from "@/stores/contact";
import { useNavigationStore } from "@/stores/navigation";
import { usePreferenceStore } from "@/stores/preference";
import { storeToRefs } from "pinia";

import { computed, ref } from "vue";

const { fontSize } = storeToRefs(usePreferenceStore());

const { createPatientPasscode } = usePreferenceStore();
const { setNavOn } = useNavigationStore();

const { 
    //createPasscode
} = useContactStore();

let passcode1 = ref("");
let passcode2 = ref("");
let passcode3 = ref("");
let passcode4 = ref("");

const styleObject = computed(() => ({
      '--font-size': fontSize.value,
}));

async function goHome() {
    update();
    setNavOn();
    void router.push({ name: "Home" });
}

async function back() {
    void router.push({ name: "PreferencePb" });
}

async function update() {
    let passcode = passcode1.value + passcode2.value + passcode3.value + passcode4.value;
    await createPatientPasscode(passcode);
}

</script>

<template>
    <main>
      <img class="back-button" @click="back" src="@/assets/images/back.svg"/>
  
    <h2 :style="styleObject">Set a friend passcode</h2>

    <p :style="styleObject">Other users who want to connect you on ALWAYS (your family, your friends) will need this passcode to activate their account.</p>
      
    <div class="password">
      <input type="password" v-model="passcode1" maxlength="1" size="1" class="custom-input">
      <input type="password" v-model="passcode2" maxlength="1" size="1" class="custom-input">
      <input type="password" v-model="passcode3" maxlength="1" size="1" class="custom-input">
      <input type="password" v-model="passcode4" maxlength="1" size="1" class="custom-input">
  
    </div > 
    <div class="finish">
      <button class="blackbuttoncenterlong" @click="goHome" > Finish</button>
    </div>
    </main>
  </template>
  
  <style scoped>
  .finish {
    padding-top: 20px;
    display: flex;
    justify-content: center;
  }
  h1 {
    text-align: center;
  }

  h2 {
    text-align: center;
  }
.password {
  display: flex;
  justify-content: center;
}
  .custom-input {
    border: 2px solid black;
    border-radius: 10px;
    background: rgba(163, 163, 161, 0.232);
    padding: 10px;
    outline: none;
    appearance: none; 
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 20px;
    margin-right: 10px;
  }

 
  
  p {
    position: relative;
    display: block;
    font-size: var(--font-size);
    color: rgb(0, 0, 0);
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 20px;
    text-align: left;
  }
  
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    height: 100vh; 
    padding: 20px;
  }

  .time-capsule {
    margin-bottom: 20px;
  }
  
  .back-button {
    position: absolute;
    top: 60px;
    left: 20px;
  }
  
  .next-button {
    position: absolute;
    bottom: 80px;
    right: 20px;
  }
  </style>