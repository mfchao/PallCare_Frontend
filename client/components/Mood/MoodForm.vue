<script setup lang="ts">
import { useMoodStore } from "@/stores/mood";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";



const notify = ref(false);
const { createMood, refreshMood, deleteMood} = useMoodStore();
const { userMood, hasMood} = storeToRefs(useMoodStore());

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const customEmoji = ref('');
const selectedMood = ref('');

async function create(mood:string) {
  selectedMood.value = mood;
  await createMood(mood, notify.value);
  await refreshMood(currentUsername.value);
}

async function clear() {
  await deleteMood();
  await refreshMood(currentUsername.value);
  selectedMood.value = '';
  customEmoji.value = ''; 

}

async function submitCustomMood(event: Event) {
  event.preventDefault(); 
  await create(customEmoji.value);
}

const happy =  String.fromCodePoint(0x1F603);
const chill =  String.fromCodePoint(0x1F60C); 
const stressed =  String.fromCodePoint(0x1F616); 
const sad =  String.fromCodePoint(0x1F614); 

onBeforeMount(() => {
    refreshMood(currentUsername.value);

    if(hasMood) {
        selectedMood.value = userMood.value;
    }
});
</script>

<template>
    <div class="container">

    <div>
        <h2>How are you feeling today?</h2>
    </div>
    <div class="moods" >
        <div class="mood"  @click="create(`${happy}`)">
            <p :class="{ 'selected-emoji': selectedMood === `${happy}` }">{{happy}}</p>
        </div>
        <div class="mood" @click="create(`${chill}`)">
            <p :class="{ 'selected-emoji': selectedMood === `${chill}` }">{{chill}}</p>
        </div>
        <div class="mood" @click="create(`${stressed}`)">
            <p :class="{ 'selected-emoji': selectedMood === `${stressed}` }">{{stressed}}</p>
        </div>
        <div class="mood" @click="create(`${sad}`)">
            <p :class="{ 'selected-emoji': selectedMood === `${sad}` }">{{sad}}</p>
        </div>
        <div>
            <div class="other-container">
                <p class="other">Other:</p>
                <form @submit="submitCustomMood">
                    <input class="custom-input" v-model="customEmoji" placeholder="Enter Emoji" />
                </form>
            </div>
            
        </div>
    </div>
    <hr class="separator">
    <div class="options">
        <div class="notify">
              <p class="form-subtitle">Notify Others</p>
              <label class="switch">
                <input type="checkbox" v-model="notify">
                <span class="slider round"></span>
              </label>
        </div>
        <button @click="clear()">Clear Mood</button>
    </div>
</div>

</template>

<style scoped>
.container {
    border: 2px solid black;
    padding: 10px; 
    border-radius: 10px;
    margin-bottom: 20px;
    margin-top: 10px;
    max-width: 500px;
}

.selected-emoji {
    font-size: 1.7em; 
}

.separator {
    border-top: 1px solid rgba(0, 0, 0, 0.287); 
    margin: 20px 0; 
}

.mood {
    width: 75px;
    height: 70px;
    font-size: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
}
.mood p {
    transition: font-size 0.3s ease;
}

.moods {
    display: flex;
    justify-content: center;
    align-items: center;
}

.other-container {
    margin-left: 20px;
    margin-right: 20px;
}

.other {
    font-size: 0.8em;
    margin-bottom: 3px;
}

.custom-input {
    width: 60px; 
    height: 20px; 
    border: 2px solid black;
    background-color: beige;
    text-align: center;
    font-size: 0.7em;
    margin-top: 0px;
    border-radius: 5px;
}

.options {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    margin-top: 10px;
}

.notify {
    display: flex;
    align-items: center;
    gap: 10px;
}

.checkbox  {
    margin-right: 5px;
}

.viewers {
    text-decoration: underline;
}

button {
    -webkit-backdrop-filter: blur(8px);
    /* Safari 9+ */
    backdrop-filter: blur(8px);
    /* Chrome and Opera */
    box-shadow: 0px 2px 10px 2px rgb(0 0 0 / 15%);
    font-family: SF Pro Display;
    letter-spacing: 0.08em;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    outline: inherit;
    text-transform: uppercase;
    transition: .3s ease;
    display: flex;
    width: 120px;
    height: 30px;
    padding: 18px;
    border: none;
    justify-content: center;
    align-items: center;
    border-radius: 33px;
    background: #131313;
    color: #F0E7D8;
  }
  




</style>
