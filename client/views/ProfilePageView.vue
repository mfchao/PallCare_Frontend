<script setup lang="ts">
import SendProfileLetterComponent from "../components/Letter/SendProfileLetterComponent.vue";
import ViewPatientMood from "../components/Mood/ViewPatientMood.vue";
import router from "../router";

const props = defineProps(["username"]);
</script>

<template>
  <main>
    <div class="navigation">
      <img @click="router.push({ name: 'Topic' })" src="@/assets/images/back.svg" />
      <text class="pagetitle">{{ props.username }}'s Profile</text>
    </div>

    <div class="container">
      <div class="header">
        <img class="profile-pic-patient" src="@/assets/images/profile.svg" />
        <h1 class="username">{{ props.username }}</h1>
      </div>

      <ViewPatientMood :username="props.username" />
      <hr class="separator" />

      <div class="icon-container">
        <img src="@/assets/images/diaryON.svg" class="navImage" @click="router.push({ path: `/diaryF/${props.username}` })" />
        <img src="@/assets/images/wishON.svg" class="navImage" @click="router.push({ name: 'WishF' })" />
      </div>
    </div>
    <SendProfileLetterComponent :to="username" />
  </main>
</template>
<style scoped>
main {
  min-height: 100vh;
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagetitle {
  display: flex;
  width: 240px;
  height: 45px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #131313;
  font-family: New York;
  font-size: 30px;
  font-style: normal;
  font-weight: 496;
  line-height: normal;
  text-transform: uppercase;
}
.navigation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 13px;
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
</style>
