<script setup lang="ts">
import router from "@/router";
import { usePreferenceStore } from "@/stores/preference";
import { storeToRefs } from "pinia";
import LetterListComponent from "../../components/Letter/LetterListComponent.vue";

const { patientUsername } = storeToRefs(usePreferenceStore());

</script>

<template>
    <main>
        <body>
            <div class="navigation">
                <img @click="router.push({ name: 'Home' })" src="@/assets/images/home.svg"/>
                <text class="pagetitle">Letters by {{patientUsername}}</text>
            </div>
            <LetterListComponent />
        </body>
    </main>
    
</template>

<style scoped>
.navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  .pagetitle{
    display: flex;
    width: 240px;
    height: 45px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #131313;
    font-family: New York;
    font-size: 35px;
    font-style: normal;
    font-weight: 496;
    line-height: normal;
    text-transform: uppercase;
  }

  body {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 60px 18px 120px 18px;
    justify-content: space-between;
    flex-direction: column;
    background:#F0E7D8;
    gap: 15px;
  }

  main{
    height: 100vh;
  }
</style>