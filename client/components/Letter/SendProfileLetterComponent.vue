<script setup lang="ts">
import { useNavigationStore } from "@/stores/navigation";
import { onBeforeMount, ref } from "vue";
import router from "../../router";
import { useLetterStore } from "../../stores/letter";

const { setNavOff } = useNavigationStore();

const { createLetter } = useLetterStore();
//to is a list of string
const props = defineProps(["to"]);
let content = ref("");
let responseEnabled = ref<boolean>(false);
let delay = ref("");
let delay_date = ref("");

onBeforeMount(async () => {
  setNavOff();
});

async function submitForm() {
  try {
    await createLetter(props.to, content.value, responseEnabled.value, delay_date.value);
  } catch (e) {
    await router.push({ name: "Letter" });
  }
}
</script>
<template>
  <body>
    <text class="pagetitle">Send Letter to {{ props.to }}</text>
    <form class="create-form" @submit.prevent="submitForm">
      <div class="letterinputspace">
        <textarea class="letter-content" id="content" v-model="content" placeholder="Write the letter here!" required> </textarea>
      </div>

      <div class="setting">
        <div class="field-title">
          <p class="setting-title">Settings</p>
          <span class="badge">?</span>
        </div>
        <fieldset class="letter-fields">
          <div class="left">
            <!-- Response -->
            <div class="delay">
              <p class="form-subtitle">Allow Reply</p>
              <label class="switch">
                <input type="checkbox" v-model="responseEnabled" />
                <span class="slider round"></span>
              </label>
            </div>
            <!-- Delay -->
            <div class="delay">
              <p class="form-subtitle">Delay</p>
              <label class="switch">
                <input type="checkbox" id="delay" v-model="delay" />
                <span class="slider round"></span>
              </label>
            </div>

            <div v-if="delay">
              <p class="form-subtitle">Delay date</p>
              <input type="date" id="delay_date" v-model.trim="delay_date" placeholder="" required />
            </div>
          </div>
        </fieldset>
      </div>
      <button type="submit" class="bluebuttoncenterlong">Create Letter</button>
    </form>
  </body>
</template>
<style scoped>
body {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 60px 18px 120px 18px;
  justify-content: space-between;
  flex-direction: column;
  background: #f0e7d8;
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
  font-size: 20px;
  font-style: normal;
  font-weight: 496;
  line-height: normal;
  text-transform: uppercase;
}
/* h1.{
  font-size: 25px;
} */
.navigation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 13px;
}

.setting {
  display: flex;
  height: 190px;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px 0px 0px 10px;
  gap: 0px;
}
.field-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.setting-title {
  color: #000;
  font-family: SF Pro Display;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 0px;
  /* line-height: 103.822%; 20.764px */
}

.letterinputspace {
  display: flex;
  width: 300px;
  height: 300px;
  padding-top: 10px;
  /* padding-bottom: 0px; */
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-space-075, 6px);
  border-radius: var(--numbers-spacing-12, 12px);
  background: #9fb9c7;
}

.rec {
  display: flex;
  width: 100px;
  height: 27px;
  flex-direction: column;
  justify-content: center;
  color: #000;
  font-family: SF Pro Display;
  /* font-size: 12px; */
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  /* background-color: #EDB4C7; */
  border-radius: 7px;
  border: 1.3px solid #000;
  /* padding-bottom: 5px; */
}
.receiver {
  color: #000;
  font-family: SF Pro Display;
  position: relative;
  font-style: normal;
  font-weight: 500;
  padding-left: 10px;
  line-height: 0;
  background-color: #edb4c7;
  text-align: bottom;
}
textarea.letter-content {
  display: flex;
  width: 260px;
  height: 226px;
  padding: 10px 11px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
}

.create-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.letter-fields {
  display: flex;
  width: 290px;
  height: 120px;
  padding: 10px 0px 10px 10px;
  align-items: column;
  gap: 13px;
  flex-shrink: 0;
  border-radius: var(--numbers-spacing-12, 12px);
  border: 1.5px solid #000;
}
.left {
  gap: 12px;
}
.right {
  /* gap: 12px; */
  display: flex;
  width: 1px;
  flex-direction: column;
  align-items: column;
  gap: 1px;
  flex-shrink: 0;
}
.delay {
  display: flex;
  align-items: center;
  gap: 22px;
}

.form-subtitle {
  color: #000;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 500;
  height: 1px;
  line-height: 0;
  /* line-height: 103.822%; 13.497px */
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

input.contact {
  display: flex;
  width: 92px;
  height: 80px;
  align-items: flex-start;
  gap: 3px;
  flex-shrink: 0;
  border-radius: var(--numbers-spacing-12, 7px);
  border: 1.5px solid #000;
  font-size: 12px;
  align-items: flex-start;
  /* padding: 5px 5px 5px 5px; */
}
</style>
