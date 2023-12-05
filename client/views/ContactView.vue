<script setup lang="ts">
import router from "@/router";
import { useContactStore } from "@/stores/contact";



const { 
    //createPasscode
} = useContactStore();



async function back() {
    void router.push({ name: "Home" });
}

async function update() {
//   await createPasscode({ passcode });
}

</script>

<template>
    <main>
      <img @click="back" src="@/assets/images/back.svg"/>
  
    <h1>Your Contacts</h1>

    <div>
        <div>
            <h2>App Contacts</h2>
            <span class="badge">?</span>
        </div>
        <div>
            <img src="@/assets/images/profile.svg"/>
            <p>Contact Name</p>
        </div>
        <div>
            <img src="@/assets/images/profile.svg"/>
            <p>Contact Name</p>
        </div>
        <button>Invite User to App</button>
    </div>

    <div>
        <div>
            <h2>Email Contacts</h2>
            <span class="badge">?</span>
        </div>
        <div>
            <img src="@/assets/images/user.svg"/>
            <p>Email address</p>
        </div>
        <div>
            <img src="@/assets/images/user.svg"/>
            <p>Email address</p>
        </div>
        <button>Add email contact</button>
    </div>
  
    </main>
  </template>
  
  <style scoped>
  h1 {
    text-align: center;
  }
  </style>