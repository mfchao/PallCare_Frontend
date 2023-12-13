<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const emit = defineEmits(["refreshResponses"]);

const createPost = async (content: string) => {
  let new_post;
  try {
    new_post = (
      await fetchy("/api/posts", "POST", {
        body: { content: content },
      })
    ).post;
  } catch (_) {
    return;
  }
  emit("refreshResponses", new_post);
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form class="response" @submit.prevent="createPost(content)">
    <textarea id="content" v-model="content" placeholder="Write Your Response!" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">submit</button>
  </form>
</template>

<style scoped>
form {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

#content {
  width:90%;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  resize: none;
}

button {
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #000;
  cursor: pointer;
}
</style>
