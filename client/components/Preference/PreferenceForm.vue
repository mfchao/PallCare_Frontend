<script setup lang="ts">
import router from "@/router";
import { useNavigationStore } from "@/stores/navigation";
import { usePreferenceStore } from "@/stores/preference";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

const { updatePreferences, getPreferences, updatePrefStore } = usePreferenceStore();
const { setNavOff } = useNavigationStore();
const { userType, currentUsername } = storeToRefs(useUserStore());
const { getUserType } = useUserStore();
const { age, visualAid, fontSize } = storeToRefs(usePreferenceStore());

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);

const styleObject = computed(() => ({
  "--font-size": fontSize.value,
}));

let selectedAge = ref(age.value);
let selectedAid = ref(visualAid.value ? "Yes" : "No");
let selectedFont = ref(fontSize.value);

async function update() {
  fontSize.value = selectedFont.value;
  const timeCapsule = (await getPreferences()).timeCapsule;
  await updatePreferences({ timeCapsule, age: selectedAge.value, visualAid: selectedAid.value === "Yes", fontSize: fontSize.value });

  if (userType.value == "patient" && currentRouteName.value != "Settings") {
    void router.push({ name: "PreferencePb" });
  } else if (currentRouteName.value != "Settings") {
    void router.push({ name: "PreferenceFb" });
  }
}

onBeforeMount(async () => {
  await updatePrefStore();
});
</script>

<template>
  <div v-if="userType == 'patient'" class="dropdown-wrapper" :style="styleObject">
    <label for="ages" class="preference-label">Age</label>
    <br />
    <br />
    <select id="ages" v-model="selectedAge" class="styled-dropdown" :style="styleObject">
      <option :style="styleObject" disabled value="">Please select your age</option>
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
  <div v-else-if="userType == 'family'" class="dropdown-wrapper" :style="styleObject">
    <label for="relationship" class="preference-label">Relationship</label>
    <br />
    <br />
    <select id="relationship" v-model="selectedAge" class="styled-dropdown" :style="styleObject">
      <option :style="styleObject" disabled value="">Please specify relationship with patient</option>
      <option>Spouse</option>
      <option>Parent</option>
      <option>Child</option>
      <option>Partner</option>
      <option>Friend</option>
      <option>Other</option>
    </select>
  </div>

  <div class="dropdown-wrapper" :style="styleObject">
    <label for="aid" class="preference-label">Visual Aid Needed</label>
    <br />
    <br />
    <select id="aid" v-model="selectedAid" class="styled-dropdown" :style="styleObject">
      <option :style="styleObject" disabled value="">Do you need visual aid?</option>
      <option>Yes</option>
      <option>No</option>
    </select>
  </div>

  <div class="dropdown-wrapper" :style="styleObject">
    <label for="font" class="preference-label">Font Size</label>
    <br />
    <br />
    <select id="font" v-model="selectedFont" class="styled-dropdown" :style="styleObject">
      <option :style="styleObject" disabled value="">Preferred font size</option>
      <option>larger</option>
      <option>large</option>
      <option>medium</option>
      <option>small</option>
      <option>smaller</option>
    </select>
  </div>

  <div v-if="currentRouteName == 'Settings'">
    <button @click="update" src="@/assets/images/next.svg">Update</button>
  </div>
  <div v-else>
    <img class="next-button" @click="update" src="@/assets/images/next.svg" />
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
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
}

.next-button {
  margin: auto;
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
  font-size: var(--font-size);
}

.dropdown-wrapper {
  position: relative;
  display: block;
  margin-right: auto;
  margin-left: auto;
}

.dropdown-wrapper::after {
  content: "▼";
  font-size: var(--font-size);
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

option {
  font-size: var(--font-size);
}

.preference-label {
  font-style: italic;
  font-weight: bold;
}
</style>
