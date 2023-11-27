<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";



const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());



async function loginUser() {
  void router.push({ name: "Login" });
}

async function registerUser() {
  void router.push({ name: "Register" });
}

</script>

<template>
    <main>
  

        <div v-if="isLoggedIn" class="home">
          <!-- <h1>This week's SpotLite</h1> -->
          <SpotInfoComponent/>
          <PostListComponent />
        </div>
    
        <div v-else class="relative">
            <div class="centered ">
              <img class="animate logo" src="@/assets/images/logo.svg" />
           </div>
    
          <div class="forms fade-in">
            <div class="welcometitle>">
              <h1>Welcome to Palliative Care App</h1>
            </div>
            
            <div class="info">
              <img src="@/assets/images/placeholderimage0.png" width="300"/>
            </div>

            <div class="button-container">
              <button @click="loginUser" ><p class="login">LOGIN</p></button>
              <button class="bluebutton" @click="registerUser"> <p class="Register">REGISTER</p></button>
            </div>
            
            
          </div>
          <!-- <div class="bg-container fade-in">
            <img class="background-image" src="@/assets/images/gradient1.png"/>
          </div> -->
          
        </div>
      </main>
</template>

<style scoped>
.home {
    background-image: url("@/assets/images/gradient2.png");
    background-repeat: no-repeat;
    background-size: fill;
    background-position: center;
    background-attachment: fixed;
  }
  
.info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.welcometitle {
  width: 299px;
  height: 100px;
}

  
h1 {
  display: flex;
  width: 350px;

  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-family: New York;
  font-size: 30px;
  font-style: italic;
  font-weight: 496;
  line-height: normal;
  text-transform: uppercase;
}

* {
transition: all 0.5s ease;
}

.button-container {
/* margin-top: 25px;
display: flex;
justify-content: center;
gap: 30px;
margin-bottom: 20px; */
display: flex;
width: 290px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: var(--numbers-spacing-16, 16px);
}

button {
-webkit-backdrop-filter: blur(8px);  /* Safari 9+ */
backdrop-filter: blur(8px); /* Chrome and Opera */
box-shadow: 0px 2px 10px 2px rgb(0 0 0 / 15%);
/* background: rgba(255, 255, 255, 0.09); 
    color: black;
    border: none;
    padding: 0.8em; */
border-radius: 10px;
font-family: SF Pro Display;
letter-spacing: 0.08em;
font-size: 0.8em;
    cursor: pointer;
    outline: inherit;
text-transform: uppercase;
transition: .3s ease;
display: flex;
width: 290px;
height: 55px;
padding: 18px 105px;
border:none;
justify-content: center;
align-items: center;
gap: 80px;
border-radius: 33px;
background: #131313;
}
button.bluebutton {
  background: #9FB9C7;
}
p.login {
  color: #FFF;
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
background:rgba(255, 255, 255, 0.3); 
}

.selected {
background:rgba(255, 255, 255, 0.3); 
}

.centered {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}

.logo {
position: absolute;
width: 10em;
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

.background-image  {
width: 100%;
height: 100%;
object-fit: cover;
}

.relative {
position: relative;
width: 100vw;
height: 100vh;
flex-direction: column;
align-items: center;
justify-content: center;
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
0%,100% { opacity: 0; }
60% { opacity: 1; }
}

@keyframes fadeinout {
0%,100% { opacity: 0; }
60% { opacity: 1; }
}

@-webkit-keyframes fadein {
0%, 60%{ opacity: 0; }
100% { opacity: 1; }
}

@keyframes fadein {
0%, 60% { opacity: 0; }
100% { opacity: 1; }
}

@keyframes fadeInAll {
0% {opacity: 0;}
100% {opacity: 1;}
}


.forms {
position: absolute;
top: 40%;
left: 50%;
transform: translate(-50%, -50%);
width: 100%;
height: 120%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
z-index: 10;
gap: 57px;
/* display: inline-flex; */
background: #F0E7D8;
}

main {
animation: fadeInAll 1.5s ease-in;
}
</style>