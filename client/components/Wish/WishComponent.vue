<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";
import { formatDate } from "../../utils/formatDate";

const props = defineProps(["wish"]);
const emit = defineEmits(["editWish", "refreshWishes"]);
const { currentUsername } = storeToRefs(useUserStore());
const { isContact } = useUserStore();
const canView = await isContact(props.wish.author) || props.wish.author == currentUsername;
const deleteWish = async () => {
  try {
    await fetchy(`/api/wishes/${props.wish._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshWishes");
};
</script>

<template>
    <p class="author">{{ props.wish.author }}</p>
    <p>{{ props.wish.content }}</p>
    <div class="base">
        <menu v-if="props.wish.author == currentUsername">
            <li><button class="btn-small pure-button" @click="emit('editWish', props.wish._id)">Edit</button></li>
            <li><button class="button-error btn-small pure-button" @click="deleteWish">Delete</button></li>
        </menu>
        <article class="timestamp" v-if="canView">
            <p v-if="props.wish.dateCreated !== props.wish.dateUpdated">Edited on: {{ formatDate(props.wish.dateUpdated) }}</p>
            <p v-else>Created on: {{ formatDate(props.wish.dateCreated) }}</p>
        </article>
    </div>
</template>

<style scoped>
p {
    margin: 0em;
}

.author {
    font-weight: bold;
    font-size: 1.2em;
}

menu {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    gap: 1em;
    padding: 0;
    margin: 0;
}

.timestamp {
    display: flex;
    justify-content: flex-end;
    font-size: 0.9em;
    font-style: italic;
}



</style>