<script setup lang="ts">

import router from "@/router";
import { usePreferenceStore } from "@/stores/preference";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";



const { setOn, setOff, updatePreferences } = usePreferenceStore();
const { showNav} = storeToRefs(usePreferenceStore());
const { userType} = storeToRefs(useUserStore());


let age = ref("");
let aid = ref("");


async function accountType() {
  void router.push({ name: "AccountType" });
}

async function update() {
  let visualAid;
  if (aid.value === "Yes") {
    visualAid = true;
  } else {
    visualAid = false;
  }
  await updatePreferences({ age: age.value });
  await updatePreferences({ visualAid: visualAid });

  if(userType.value == "patient"){
    void router.push({ name: "PreferencePb" });
  }else{
    void router.push({ name: "PreferenceFb" });
  }

}

onBeforeMount(() => {
  setOn();
});

</script>

<template>
  <main>
    <div v-if="userType == 'patient'">
      <img @click="accountType" src="@/assets/images/back.svg"/>
    </div>
    
    <h1>Let Us Know More About You ...</h1>

    <div v-if="userType == 'patient'">
      <select v-model="age">
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
    <div v-else-if="userType == 'family'">
      <select v-model="age">
        <option disabled value="">Relationship to Patient</option>
        <option>Spouse</option>
        <option>Parent</option>
        <option>Child</option>
        <option>Partner</option>
        <option>Friend</option>
        <option>Other</option>
      </select>
    </div>
    
      
    <select v-model="aid">
      <option disabled value="">Do you need a visual aid?</option>
      <option>Yes</option>
      <option>No</option>
    </select>

    <p>These can be changed later in settings</p>
    
      <img @click="update" src="@/assets/images/next.svg"/>

  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>



