<script setup lang="ts">
import { useMoodStore } from "@/stores/mood";
import { usePreferenceStore } from "@/stores/preference";
import { useUserStore } from "@/stores/user";
import { formatDateCustom } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";


const styleObject = computed(() => ({
      '--font-size': fontSize.value,
    }));

    const { fontSize } = storeToRefs(usePreferenceStore());


const isLoading = ref(true);

const notify = ref(false);
const { createMood, refreshMood, deleteMood, getPreviousMoods} = useMoodStore();
const { userMood, hasMood, previousMoods, datesUpdated, hasPreviousMoods} = storeToRefs(useMoodStore());

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const customEmoji = ref('');
const selectedMood = ref('');

function selectMood(mood:string) {
  selectedMood.value = mood;
}

async function create() {
    if (customEmoji.value) {
        await createMood(customEmoji.value, notify.value);
        customEmoji.value  ='';
    } else if (selectedMood.value) {
        await createMood(selectedMood.value, notify.value);
        customEmoji.value  ='';
  }
  void refreshMood(currentUsername.value);
  await getPreviousMoods(currentUsername.value);
}

async function clear() {
  await deleteMood();
  void refreshMood(currentUsername.value);
  selectedMood.value = '';
  customEmoji.value = ''; 

}

async function submitCustomMood(event: Event) {
  event.preventDefault(); 
  await createMood(customEmoji.value, notify.value);
  void refreshMood(currentUsername.value);
  await getPreviousMoods(currentUsername.value);
}

const happy =  String.fromCodePoint(0x1F603);
const chill =  String.fromCodePoint(0x1F60C); 
const stressed =  String.fromCodePoint(0x1F616); 
const sad =  String.fromCodePoint(0x1F614); 

onBeforeMount(() => {
    void refreshMood(currentUsername.value);
    isLoading.value = false;

    if(hasMood) {
        selectedMood.value = userMood.value;
    }
});
</script>

<template>
    <div class="container">

    <div>
        <h2 :style="styleObject">How are you feeling today?</h2>
    </div>
    <div class="moods" >
        <div class="mood"  @click="selectMood(`${happy}`)">
            <h5 :class="{ 'selected-emoji': selectedMood === `${happy}` }">{{happy}}</h5>
        </div>
        <div class="mood" @click="selectMood(`${chill}`)">
            <h5 :class="{ 'selected-emoji': selectedMood === `${chill}` }">{{chill}}</h5>
        </div>
        <div class="mood" @click="selectMood(`${stressed}`)">
            <h5 :class="{ 'selected-emoji': selectedMood === `${stressed}` }">{{stressed}}</h5>
        </div>
        <div class="mood" @click="selectMood(`${sad}`)">
            <h5 :class="{ 'selected-emoji': selectedMood === `${sad}` }">{{sad}}</h5>
        </div>
        <div>
            <div class="other-container">
                <p class="other">Other:</p>
                <form @click="selectMood(`${customEmoji}`)">
                    <input class="custom-input" v-model="customEmoji" placeholder="Enter Emoji" />
                </form>
            </div>
        </div>

    </div>
    <button @click="create">Submit Mood</button>

    <hr class="separator">

    <h2>Mood Tracker</h2>
    <div class="previous-moods" v-if="hasPreviousMoods && !isLoading">
        <div v-for="(mood, index) in [...previousMoods].reverse()" :key="index" class="previous-mood">
            <p class="past-mood">{{ mood }}</p>
            <p class="past-mood-date">{{ formatDateCustom([...datesUpdated].reverse()[index], "MM/DD/YY") }}</p>
        <p class="past-mood-time">{{ formatDateCustom([...datesUpdated].reverse()[index], "h:mm a") }}</p>
        </div>
    </div>
    <div v-else-if="!isLoading">
        <p class="past-mood-text" :style="styleObject">Your previous moods will show up here.</p>
    </div>
    <div v-else>
        <p>Loading...</p>
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
        <button @click="clear()">Clear Moods</button>
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

.past-mood-text {
    font-size: 0.9em;
    color: grey;
}

.past-mood {
    font-size: 2em;
    line-height: 0;
}

.past-mood-date {
    font-size: 0.8em;
    color: rgb(54, 54, 54);
    line-height: 0;
}

.past-mood-time {
    font-size: 0.75em;
    color: rgb(139, 139, 139);
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
    background-color: rgba(163, 163, 161, 0.102);
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
  

  .previous-moods {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    padding:10px
}

.previous-mood {
    min-width: 70px;
    padding: 10px;
    background-color: rgba(208, 208, 208, 0.185);   
    box-shadow: 2px 5px 5px #a8a8a8;
    border-radius: 10px;
    margin-right: 10px;
}

h2 {
    
    font-size: var(--font-size);
  }



</style>
