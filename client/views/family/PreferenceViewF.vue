<script setup lang="ts">

import router from "@/router";

import { usePreferenceStore } from "@/stores/preference";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";


const { setOn, setOff } = usePreferenceStore();
const { showNav} = storeToRefs(usePreferenceStore());

let username = ref("");
let passcode1 = ref("");
let passcode2 = ref("");
let passcode3 = ref("");
let passcode4 = ref("");

async function verify() {
  let passcode = passcode1.value + passcode2.value + passcode3.value + passcode4.value;

  void router.push({ name: "PreferenceP" });
}

async function noPasscode() {
  
 //do something
}

onBeforeMount(() => {
  setOn();
});

async function accountType() {
  void router.push({ name: "AccountType" });
}




</script>

<template>
  <main>
    <img @click="accountType" src="@/assets/images/back.svg"/>

    <h1>Link to your patient</h1>

      <p>As a non-patient user, you have to link your account to the patient you are taking care of to start your account</p>

      <h2 >Patient Username:</h2>
        <form >
            <input v-model="username" placeholder="ex: Amily004" />
        </form>

        <h2 >Patient Passcode:</h2>
        <input type="password" v-model="passcode1" maxlength="1" size="1">
        <input type="password" v-model="passcode2" maxlength="1" size="1">
        <input type="password" v-model="passcode3" maxlength="1" size="1">
        <input type="password" v-model="passcode4" maxlength="1" size="1">
        <button @click="noPasscode" > No Passcode</button>
   


    <button @click="verify"> Verify</button>

  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
