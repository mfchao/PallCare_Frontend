<script setup lang="ts">
import router from "@/router";
import { useMoodStore } from "@/stores/mood";
import { useNavigationStore } from "@/stores/navigation";
import { usePreferenceStore } from "@/stores/preference";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";
import DelayedLettersComponent from "../components/Letter/DelayedLettersComponent.vue";
import MoodForm from "../components/Mood/MoodForm.vue";
import ViewPatientMood from "../components/Mood/ViewPatientMood.vue";
import { useForumStore } from "../stores/forum";
import { formatDate } from "../utils/formatDate";

const isLoading = ref(true);
const { userMood, hasMood } = storeToRefs(useMoodStore());
const { currentUsername, isLoggedIn, isFamily } = storeToRefs(useUserStore());
const { getUserType } = useUserStore();

const { refreshMood } = useMoodStore();
const { patientUsername, fontSize } = storeToRefs(usePreferenceStore());
const { setNavOff, setNavOn } = useNavigationStore();
const { getBoundPatientNamebyContactUsername, updatePrefStore } = usePreferenceStore();
const { resetStore } = useForumStore();

const styleObject = computed(() => ({
  "--font-size": fontSize.value,
}));

let currentDate = formatDate(new Date());

async function loginUser() {
  void router.push({ name: "Login" });
}

async function registerUser() {
  void router.push({ name: "Register" });
}

async function settings() {
  void router.push({ name: "Settings" });
}

async function contacts() {
  let buttonbg = true;
  void router.push({ name: "Contact" });
  buttonbg = false;
}

async function diary() {
  void router.push({ path: `/diaryF/${patientUsername.value}` });
}

async function wish() {
  void router.push({ path: `/wishF/${patientUsername.value}` });
}

async function letter() {
  void router.push({ name: "LetterF" });
}

onBeforeMount(async () => {
  isLoading.value = true;
  await updatePrefStore();
  await getUserType(currentUsername.value);

  await getBoundPatientNamebyContactUsername(currentUsername.value);

  if (isFamily && patientUsername.value) {
    setNavOff();

    void refreshMood(patientUsername.value);
  } else if (currentUsername.value) {
    void refreshMood(currentUsername.value);
  }
  resetStore(); // update the forum prior to clicking on it
  setNavOn();
  isLoading.value = false;
});
</script>

<template>
  <main>
    <!-- home page -->
    <div v-if="isLoggedIn" class="home-container">
      <div class="flex-container">
        <div>
          <p id="date" class="text-left date" :style="styleObject">{{ currentDate }}</p>
          <h1 :style="styleObject" class="text-left">Hi {{ currentUsername }} !</h1>
        </div>
        <!-- <img @click="settings" class="settings-icon" src="@/assets/images/settings.svg"/> -->
        <div class="profile-container">
          <img class="profile-pic" src="@/assets/images/profile.svg" />
          <div v-if="hasMood && !isFamily" class="mood-emoji">{{ userMood }}</div>
        </div>
      </div>

      <div v-if="!isFamily && !isLoading">
        <MoodForm />
        <DelayedLettersComponent :num_letters="Number(3)" />
      </div>

      <div v-else-if="isFamily && !isLoading" class="container">
        <div class="header">
          <img class="profile-pic-patient" src="@/assets/images/profile.svg" />
          <h1 class="username">{{ patientUsername }}</h1>
        </div>

        <ViewPatientMood />
        <hr class="separator" />

        <div class="icon-container">
          <img src="@/assets/images/diaryON.svg" class="navImage" @click="diary" />
          <img src="@/assets/images/wishON.svg" class="navImage" @click="wish" />
          <img src="@/assets/images/letterON.svg" class="navImage2" @click="letter" />
        </div>
      </div>

      <div v-else>
        <p>Loading Moods...</p>
      </div>

      <div class="botton">
        <button v-if="!isFamily" @click="contacts" class="bluebuttoncenterlong">Contacts</button>
        <button @click="settings" class="blackbuttoncenterlong">Settings</button>
      </div>
    </div>

    <!-- welcome login -->

    <div v-else>
      <div>
        <img class="animate logo" src="@/assets/images/alwayslogo.png" />
      </div>

      <div class="forms fade-in">
        <div class="welcometitle">
          <h1>Welcome to</h1>
          <h1 class="always">ALWAYS</h1>
        </div>

        <div class="info">
          <img src="@/assets/images/welcome.png" width="300" />
        </div>

        <div class="button-container">
          <button class="blackbutton" @click="loginUser"><p class="login">LOGIN</p></button>
          <button class="bluebutton" @click="registerUser"><p class="Register">REGISTER</p></button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
h1 {
  font-size: 35px;
}
h1.always {
  font-family: New York;
  font-size: 45px;
  font-weight: medium;
  /* padding-bottom: -10px; */
  color: #f0e7d8;
  background-color: #131313;
  height: 45px;
  width: 300px;
  padding-top: 3px;
  border-radius: 24px;
}

.mood-emoji {
  position: absolute;
  bottom: 0;
  right: 0.4em;
  font-size: 20px;
}

.home-container {
  margin: 0px;
}
.separator {
  border-top: 1px solid rgba(0, 0, 0, 0.287);
  margin: 20px 0;
}
.container {
  border: 2px solid black;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-top: 10px;
  max-width: 500px;
}
.header {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-left: 5px;
}

.username {
  width: auto;
  margin-left: 10px;
}

.profile-pic {
  width: 100px;
  height: auto;
  margin-right: 20px;
}

.icon-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 10px;
}
.navImage {
  height: 1.5em;
}

.navImage2 {
  height: 1.2em;
}

main {
  min-height: 100vh;
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
}

.date {
  font-size: 0.9em;
  letter-spacing: 0.02em;
  color: rgb(81, 81, 81);
}

.mood-custom {
  border: 3px solid green;
  border-radius: 50%;
}

.info {
  display: flex;
  align-items: flex-start;
  /* gap: 10px; */
}

.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0;
}

.text-left {
  text-align: left;
  width: auto;
}

.profile-container {
  position: relative;
  max-width: 500px;
}

.profile-pic {
  position: relative;
  margin-right: 15px;
  margin-top: 15px;
  width: 50px;
}

.settings-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 22px;
}

* {
  transition: all 0.5s ease;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.bluebutton {
  /* background: #1E1E1E; */
  border-radius: 40px;
  width: 300px;
  height: 60px;
  border: none;
  outline: none;
}

.blackbutton {
  background: #1e1e1e;
  border-radius: 40px;
  width: 300px;
  height: 60px;
  border: none;
  outline: none;
}

p.login {
  color: #fff;
  text-align: center;

  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
p.Register {
  color: #131313;
  text-align: center;
  font-family: SF Pro Display;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.selected {
  background: rgba(255, 255, 255, 0.3);
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.logo {
  position: absolute;
  width: 12em;
  height: 10em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bg-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.animate {
  -webkit-animation: fadeinout 4s linear forwards;
  animation: fadeinout 4s linear forwards;
}

.fade-in {
  -webkit-animation: fadein 6s linear forwards;
  animation: fadein 6s linear forwards;
}

.fade-in-form {
  -webkit-animation: fadein 0.2s linear forwards;
  animation: fadein 0.2s linear forwards;
}

@-webkit-keyframes fadeinout {
  0%,
  100% {
    opacity: 0;
  }
  60% {
    opacity: 1;
  }
}

@keyframes fadeinout {
  0%,
  100% {
    opacity: 0;
  }
  60% {
    opacity: 1;
  }
}

@-webkit-keyframes fadein {
  0%,
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadein {
  0%,
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeInAll {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.forms {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 120%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  gap: 40px;
  /* display: inline-flex; */
  background: #f0e7d8;
}

.bluebuttoncenterlong {
  width: 220px;
  height: 60px;
}

.blackbuttoncenterlong {
  background: #edb4c7;
  width: 220px;
  height: 60px;
  color: #131313;
}

.botton {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}
</style>
