<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "../../stores/user";
import LetterComponent from "./LetterComponent.vue";
// import LetterComponent from "./LetterComponent.vue";
import { useLetterStore } from "../../stores/letter";
import { usePreferenceStore } from "../../stores/preference";

const props = defineProps(["receiver"]);
const { currentUsername } = storeToRefs(useUserStore());
const { patientUsername } = storeToRefs(usePreferenceStore());

const { getAuthorLetters, getLetterReceivedbyUser } = useLetterStore();
const loaded = ref(false);
let letterList = ref<Array<Record<string, string>>>([]);

async function getEntries() {
  let allLetters
  console.log(patientUsername.value)
  if (patientUsername.value) {
    allLetters = await getLetterReceivedbyUser()
  }
  else {
    allLetters = await getAuthorLetters();
  }
  
  let showletters = [];
  for (let i = 0; i < allLetters.length; i++) {
    if (allLetters[i].show == true) {
      showletters.push(allLetters[i]);
    }
  }
  letterList.value = showletters;

  if (props.receiver){
    let newletterList = [];
    for (let i = 0; i < letterList.value.length; i++) {
      if (letterList.value[i].to.includes(props.receiver.value)) {
        newletterList.push(letterList.value[i]);
      }
    }
    letterList.value = newletterList;
  }
  // diaryList.value = await getAuthorEntries(currentUsername.value);
}

onBeforeMount(async () => {
  await getEntries();
  console.log(letterList.value);
  loaded.value = true;
});
</script>

<template>
  <section v-if="loaded && letterList.length !== 0">
    <article v-for="letter in letterList" :key="letter._id">
      <LetterComponent :letter="letter" @refreshLetters="getEntries" />
    </article>
  </section>
  <p v-else-if="loaded">No letters found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 0px 0px 0px 0px;
}
</style>
