<script setup lang="ts">
import router from "@/router";
import { usePreferenceStore } from "@/stores/preference";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";


const { fontSize } = storeToRefs(usePreferenceStore());

const { updatePreferences } = usePreferenceStore();

const days = ref(null)

async function back() {
  void router.push({ name: "PreferenceP" });
}

async function next() {
  await updatePreferences({ timeCapsule: days.value });

  void router.push({ name: "PreferencePc" });
}




    const styleObject = computed(() => ({
      '--font-size': fontSize.value,
      // fontSize: fontSize.value,
    }));

</script>

<template>
    <main>
      <div class="navigation">
        <img  class="back-button" @click="back" src="@/assets/images/back.svg"/>
      </div>
      <text :style="styleObject" class="intro">We are committed to respecting your legacy.
        Time Machine is our new concept to help you with it:
        <br>
        Set a date for your time machine which is: after a range of time you have not logged into our app, we will help you to automatically DELETE, SEND, or REVEAL some contents which you may later specify in our app.</text>

        <div class="time-capsule">
          <h3 :style="styleObject">Set your Time Machine date:</h3>
          <form @submit="next">
              <input class="custom-input" v-model="days" placeholder="Number of Days" />
          </form>
          <h3 :style="styleObject">After I have not logged in ALWAYS for {{ days }} days, the time machine will be activated.</h3>
        </div>
        

        <p :style="styleObject">This activation time and content stored in the time machine can be changed later in settings.</p>
      
      <img class="next-button"  @click="next" src="@/assets/images/next.svg"/>  
    </main>
  </template>
  
  <style scoped>
  h1 {
    text-align: center;
  }

  main {
    padding-top: 5px;
    gap: 20px;
  }
  .custom-input {
    border: 2px solid black;
    border-radius: 10px;
    background: transparent;
    padding: 10px;
    outline: none;
    appearance: none; 
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 150px;
  }

  h2 {
    text-align: left;
    font-weight: 500;
    margin-bottom: 35px;
    font-size: var(--font-size);
  }
  
  p {
    position: relative;
    display: block;
    font-size: var(--font-size);
    color: grey;
    margin-right: auto;
    margin-left: auto;
  }
  
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    height: 100vh;
    padding-left: 5%; 
    padding-right: 4%; 
  }

  .intro{
    font-size: var(--font-size);
    font-family: SF Pro Display;
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
    bottom: 60px;
    right: 20px;
  }
  
  </style>