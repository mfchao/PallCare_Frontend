<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useDelayStore } from "../../stores/delay";
import { useLetterStore } from "../../stores/letter";
import { useUserStore } from "../../stores/user";
import { formatEntryDate } from "../../utils/formatDate";
import LetterComponent from "./LetterComponent.vue";

const { currentUsername } = useUserStore();
const props = defineProps(["num_letters"]);
const { getUserDelays } = useDelayStore();
const { getLetterById } = useLetterStore();

const letters = ref<Array<Record<string, string>>>([]);
const letterDates = ref<string[]>([]);

async function getUnsentLetters() {
  letters.value = [];
  letterDates.value = [];
  const delays = (await getUserDelays(currentUsername)).filter((delay: any) => delay.type === "Letter");
  for (const delay of delays.slice(0, props.num_letters)) {
    try {
      letters.value.push(await getLetterById(delay.content));
      letterDates.value.push(formatEntryDate(delay.activation));
    } catch {
      letters.value = [];
    }
  }
}
onBeforeMount(async () => {
  await getUnsentLetters();
});
</script>
<template>
  <div class="letter-notications">
    <h2>Upcoming Letters to Be Sent</h2>
    <div v-if="letters.length != 0" class="unsent-letters">
      <div class="unsent-letter" v-for="(letter, i) in letters" :key="letter._id">
        <LetterComponent :letter="letter" @refreshLetters="getUnsentLetters" />
        Sending on: {{ letterDates[i] }}
      </div>
    </div>
    <h2 v-else :style="{ 'font-size': '12px' }">None</h2>
  </div>
</template>
<style scoped>
.letter-notications {
  background-color: rgba(208, 208, 208, 0.185);
  box-shadow: 2px 5px 5px #a8a8a8;
  border-radius: 10px;
  height: fit-content;
  min-width: 300px;
  width: fit-content;
}
.unsent-letters {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px;
}

.unsent-letter {
  padding: 10px;
  background-color: rgba(208, 208, 208, 0.185);
  box-shadow: 2px 5px 5px #a8a8a8;
  border-radius: 10px;
  margin-right: 10px;
}
</style>
