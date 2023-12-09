<script setup lang="ts">

import router from "@/router";
import { useNavigationStore } from "@/stores/navigation";
import { usePreferenceStore } from "@/stores/preference";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";



const {  updatePreferences, getPreferences } = usePreferenceStore();
const { setNavOff } = useNavigationStore();
const { userType} = storeToRefs(useUserStore());
const { getUserType } = useUserStore();
const { currentUsername } = storeToRefs(useUserStore());
const { fontSize } = storeToRefs(usePreferenceStore());


const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);


let age = ref("");
let aid = ref("");
let font = ref("");


async function update() {
  let visualAid;
  if (aid.value === "Yes") {
    visualAid = true;
  } else {
    visualAid = false;
  }
  await updatePreferences({ age: age.value });
  await updatePreferences({ visualAid: visualAid });
  await updatePreferences({ fontSize: font.value });

  await getPreferences();

  if(userType.value == "patient" && currentRouteName.value != 'Settings'){
    void router.push({ name: "PreferencePb" });
  }else if (currentRouteName.value != 'Settings'){
    void router.push({ name: "PreferenceFb" });
  }

}




</script>

<template>

    <div v-if="userType == 'patient'" class="dropdown-wrapper">
        <select v-model="age" class="styled-dropdown">
          <option disabled value="">Please select your age</option>
          <option>under 18</option>
          <option>18-25</option>
          <option>26-35</option>
          <option>36-45</option>
          <option>46-55</option>
          <option>56-65</option>
          <option>66-75</option>
          <option>76-85</option>
          <option>85+</option>
        </select>
      </div>
      <div v-else-if="userType == 'family'" class="dropdown-wrapper">
        <select v-model="age" class="styled-dropdown">
          <option disabled value="">Relationship to Patient</option>
          <option>Spouse</option>
          <option>Parent</option>
          <option>Child</option>
          <option>Partner</option>
          <option>Friend</option>
          <option>Other</option>
        </select>
      </div>
      
        <div class="dropdown-wrapper">
          <select v-model="aid" class="styled-dropdown">
            <option disabled value="">Do you need a visual aid?</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div class="dropdown-wrapper">
          <select v-model="font" class="styled-dropdown">
            <option disabled value="">Preferred font size</option>
            <option>larger</option>
            <option>large</option>
            <option>medium</option>
            <option>small</option>
            <option>smaller</option>
          </select>
        </div>

        <div v-if="currentRouteName == 'Settings'">
          <button  @click="update" src="@/assets/images/next.svg">Update</button>
        </div>
        <div v-else>
          <img class="next-button"  @click="update" src="@/assets/images/next.svg"/>  
        </div>
        


</template>

<style scoped>

h1 {
    text-align: center;
    margin-bottom: 60px;
  }
  
  p {
    position: relative;
    display: block;
    font-size: 0.9em;
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
  }
  
  .back-button {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .next-button {
    margin: auto
 }
  
  
 
  
  
  .styled-dropdown {
    border: 2px solid black;
    border-radius: 10px;
    background: transparent;
    padding: 10px;
    outline: none;
    appearance: none; 
    -webkit-appearance: none;
    -moz-appearance: none;
    margin-bottom: 20px;
    width: 250px;
  }
  
  .dropdown-wrapper {
    position: relative;
    display: block;
    margin-right: auto;
    margin-left: auto;
  }
  
  .dropdown-wrapper::after {
    content: "▼";
    font-size: 12px;
    position: relative;
    right: 30px; 
    top: 30%;
    transform: translateY(-30%);
    pointer-events: none;
  }
  .next-button {
    position: absolute;
    bottom: 60px;
    right: 20px;
  }
</style>