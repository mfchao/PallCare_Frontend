<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import router from "../../router";
import { useLetterStore } from "../../stores/letter";


const { getLetterContactNames,getLetterById, updateLetter, getDelayByContentId, getReceiversUsername } = useLetterStore();
const props = defineProps(["_id"]);
let recv = ref("")
let content = ref("");
let responseEnabled = ref<boolean>(false);
let responsecontent = ref("");

onBeforeMount(async () => {
  const letter = await getLetterById(props._id)
  content.value = letter.content;
  responseEnabled.value = letter.responseEnabled;
  let receivers = await getReceiversUsername(letter.to)
  let receiversstring = receivers.toString()
  recv.value = receiversstring
});
async function submitForm() {
  console.log(responsecontent.value)
}

</script>
<template>
  <body>
    <div class="navigation">
      <img @click="router.push({ name: 'LetterF' })" src="@/assets/images/back.svg"/>
    </div>
    <form class="create-form" @submit.prevent="submitForm">
      <!-- <text>Letter to: {{ recv }}</text> -->
      <div class="letterinputspace">
        <text class="letter-content">{{ content }}</text>
      </div>
      <text class="subtitle">Response to this letter:</text>
      <div v-if="responseEnabled" class="responseinputspace">
        <textarea class="response-content" id="response" v-model="responsecontent" placeholder="Write your response here" required> </textarea> 
      </div>
    <button type="submit" class="bluebuttoncenterlong">Response</button>
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
  background:#F0E7D8;
}
.subtitle{
  align-items: flex-start;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 130px;
  font-size: 18px;
}

.field-title{
  display: flex;
  align-items: center;
  gap: 10px;
}

.setting-title{
  color: #000;
  font-family: SF Pro Display;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 0px;
  /* line-height: 103.822%; 20.764px */
}
.navigation{
  display: flex;
  width: 300px;
  align-items: left;
  gap: 23px;
  padding-bottom: 10px;
}

.letterinputspace{
  display: flex;
  width: 290px;
  height: 300px;
  padding: 20px 10px 10px 10px;
  flex-direction: column;
  align-items: left;
  gap: var(--spacing-space-075, 6px);
  border-radius: var(--numbers-spacing-12, 12px);
  background: #9FB9C7;
}
.responseinputspace{
  display: flex;
  width: 290px;
  height: 200px;
  padding: 18px 9px 18px 18px;
  flex-direction: column;
  align-items: left;
  gap: var(--spacing-space-075, 6px);
  border-radius: var(--numbers-spacing-12, 12px);
  background: #9FB9C7;
}


textarea.letter-content {
  display: flex;
  padding-left: 10px;
  width: 250px;
  height: 226px;
  padding: 20px 11px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
}

textarea.response-content {
  display: flex;
  padding-left: 10px;
  width: 250px;
  height: 146px;
  padding: 20px 11px;
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
  width:290px;
  height: 120px;
  padding: 10px 0px 10px 10px;
  align-items: column;
  gap: 13px;
  flex-shrink: 0;
  border-radius: var(--numbers-spacing-12, 12px);
  border: 1.5px solid #000;
}
.left{
  
  gap: 12px;
}
.right{
  /* gap: 12px; */
  display: flex;
  width: 1px;
  flex-direction: column;
  align-items: column;
  gap: 1px;
  flex-shrink: 0;
}
.delay{
  display: flex;
  align-items: center;
  gap: 22px;
}

.form-subtitle{
  color: #000;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 500;
  height: 1px;
  line-height: 0
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
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}


input.contact{
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
}

</style>
