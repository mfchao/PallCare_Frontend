<script setup lang="ts">
import router from "@/router";
import { usePreferenceStore } from "@/stores/preference";
import { storeToRefs } from "pinia";
import { ref } from "vue";



const { setOn, setOff, updatePreferences } = usePreferenceStore();
const { showNav} = storeToRefs(usePreferenceStore());

const days = ref(null)


async function back() {
  void router.push({ name: "PreferenceP" });
}

async function next() {
  await updatePreferences({ timeCapsule: days.value });

  void router.push({ name: "PreferencePc" });
}

</script>

<template>
    <main>
      <img @click="back" src="@/assets/images/back.svg"/>
  
      <p>In our app, we care about users’ privacy and their after life wishes.
        Here, you can set up your TIME CAPSULE date, which is: after a specific time you have not logged into our app, we will help you to automatically DELETE some private content or SEND some content to your contacts.</p>

        <h2 >Set your time capsule date:</h2>
        <form @submit="next">
            <input class="custom-input" v-model="days" placeholder="Number of Days" />
        </form>
        <h2>after I have not logged in, the time capsule will be activated.</h2>

        <p>This activation time and content stored in the time capsule can be changed later in settings.</p>
      
      <img @click="next" src="@/assets/images/next.svg"/>  
    </main>
  </template>
  
  <style scoped>
  h1 {
    text-align: center;
  }
  </style>