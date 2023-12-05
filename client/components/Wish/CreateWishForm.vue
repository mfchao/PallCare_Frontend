<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const emit = defineEmits(["refreshWishes"]);

const createWish = async (content: string) => {
  try {
    await fetchy("/api/wishes", "POST", {
      body: { content },
    });
  } catch (_) {
    return;
  }
  emit("refreshWishes");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
    <form @submit.prevent="createWish(content)">
        <label for="content">Wish Discription:</label>
        <textarea id="content" v-model="content" placeholder="Create a wish!" required> </textarea>
        <button type="submit" class="pure-button-primary pure-button">Create Wish</button>
    </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}


</style>
