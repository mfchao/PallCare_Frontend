<script setup lang="ts">
import { useForumStore } from "@/stores/forum";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { defineAsyncComponent, onBeforeMount, ref } from "vue";
import router from "../../router";
import { useNavigationStore } from "../../stores/navigation";
import { fetchy } from "../../utils/fetchy";
import { formatEntryDate } from "../../utils/formatDate";
import CreatePostForm from "../Post/CreatePostForm.vue";

const { setNavOn } = useNavigationStore();
const PostComponent = defineAsyncComponent(() => import("../Post/PostComponent.vue"));
const isCreatingResponse = ref(false);
const emit = defineEmits(["editTopic", "refreshTopics", "refreshResponses"]);
const { currentUsername } = storeToRefs(useUserStore());
const { isAuthor, resetStore, updateCurrentTopic } = useForumStore();
const { currentTopic } = useForumStore();
const { isInTopic } = useForumStore();
const loaded = ref(false);
const props = defineProps(["topic"]);
const isLikedbyUser = ref(false);

let responses = ref<Array<Record<string, string>>>([]);
let canEdit = ref(false);

const getResponses = async () => {
  let responseResults = [];
  let deletedResponses = Array<string>();
  for (let response of currentTopic.responses) {
    try {
      const responseResult = await fetchy(`/api/posts/${response}`, "GET");
      responseResults.push(responseResult);
    } catch (_) {
      deletedResponses.push(response);
    }
  }
  responses.value = responseResults;
  // remove deleted responses from the list of responses
  if (deletedResponses.length !== 0) {
    const new_responses = currentTopic.responses.filter((response: string) => !deletedResponses.includes(response));
    await fetchy(`/api/topics/${currentTopic._id}`, "PATCH", { body: { update: { responses: new_responses } } });
  }
};

const refreshResponses = async (new_post: Record<string, string>) => {
  // add the new post to the list of responses
  const new_responses = currentTopic.responses.concat(new_post._id);
  await fetchy(`/api/topics/${currentTopic._id}`, "PATCH", { body: { update: { responses: new_responses } } });
  updateCurrentTopic();
  // await getResponses();
  responses.value.push(new_post);
  isCreatingResponse.value = false;
  emit("refreshTopics");
};

const deleteTopic = async () => {
  try {
    await fetchy(`/api/topics/${currentTopic._id}`, "DELETE");
    router.push({ name: "Forum" });
    resetStore();
    setNavOn();
  } catch {
    return;
  }
  emit("refreshTopics");
};

const createResponse = async () => {
  isCreatingResponse.value = true;
};

const updateLike = async () => {
  if (!isLikedbyUser.value) {
    try {
      /* add the current user to the list of likes */
      
      const new_likes = currentTopic.likes.concat(currentUsername.value);
      // console.log(new_likes);
      await fetchy(`/api/topics/${currentTopic._id}`, "PATCH", { body: { update: { likes: new_likes } } });
      isLikedbyUser.value = true;
      updateCurrentTopic();
  } catch {
    return;
  }} else {{
    try {
      /* remove the current user to the list of likes */
      // console.log(currentTopic.likes);
      const new_likes = currentTopic.likes.filter((user:string) => user.toString() !== currentUsername.value);
      // console.log(new_likes);
      await fetchy(`/api/topics/${currentTopic._id}`, "PATCH", { body: { update: { likes: new_likes } } });
      isLikedbyUser.value = false;
      updateCurrentTopic();
  } catch {
    return;
  }}
};
  emit("refreshTopics");
};

onBeforeMount(async () => {  
  if (isInTopic) {
    // console.log("in topic");
    await getResponses();
    // console.log(currentTopic);
    isLikedbyUser.value = currentTopic.likes.includes(currentUsername.value);
    loaded.value = true;
    canEdit.value = await isAuthor(currentTopic._id);
    // console.log(canEdit.value);
    // console.log(isLikedbyUser.value);
  } else {
    canEdit.value = await isAuthor(props.topic._id);
  }
  loaded.value = true;
});
</script>

<template>
  <div class="topic">
    <!-- Add icon library -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="card" v-if="isInTopic">
        <div class="top">
          <text class="date">{{ formatEntryDate(currentTopic.dateCreated) }}</text>
          <text class="author" @click="router.push({ path: `/profile/${currentTopic.author}` })">by {{ currentTopic.author }}</text>   
        </div> 
        <div class="top">
          <text class="topictitle">{{ currentTopic.title }}</text>
          <div class = "buttons" v-if="canEdit">
            <button class="little-black" @click="router.push({ path: `/forum/edit/${currentTopic._id}` })"> <i class="fa fa-pencil" aria-hidden="true"></i></button>
            <button class="little-gray" @click="deleteTopic"> <i class="fa fa-trash" aria-hidden="true"></i></button>
          </div> 
        </div>
        <div class="bottom">
          <text class="topiccontent">{{ currentTopic.content }}</text>
          <div class="buttons-bottom">
            <button class="little-black" @click="createResponse"><i class="fa fa-reply" aria-hidden="true"></i></button>
            <button :class="isLikedbyUser ? 'little-red' : 'little-gray'" @click="updateLike">
              <i class="fa fa-thumbs-up" aria-hidden="true"></i>
            </button>
          </div>
        </div>       
    </div>
    <div class="card-forum" v-else>
        <div class="top">
            <text class="date">{{ formatEntryDate(props.topic.dateCreated) }}   By {{ props.topic.author }}</text>  
        </div> 
        <div class="top">
          <text class="topictitle">{{ props.topic.title }}</text>
        </div>
        <div class="bottom">
          <text class="topiccontent">{{ props.topic.content }}</text>
        </div>
    </div>
    <CreatePostForm v-if="isCreatingResponse" @refreshResponses="refreshResponses" />
    <section class="responses" v-if="isInTopic && loaded && responses.length !== 0">
      <article v-for="response in responses" :key="response._id">
        <Suspense>
          <PostComponent :post="response" />
        </Suspense>
      </article>
    </section>
    <p v-else-if="isInTopic && loaded">No responses found</p>
  </div>
</template>

<style scoped>
.topic {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}
.card-forum{
  display: flex;
  width: 300px;
  height: 100px;
  padding: 1.5px 0px 9px 1.5px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border: 1.5px solid #000;  
  border-radius: var(--numbers-spacing-12, 12px);
}
.card {
  display: flex;
  width: 300px;
  height: 150px;
  padding: 1.5px 0px 9px 1.5px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  /* add a line to the bottom of the card */
  border-bottom: 1.5px solid #000;  
}

p {
  margin: 0;
}
.top {
  display: flex;
  width: 300px;
  height: 20px;
  padding: 0px -10px;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  flex-shrink: 0;
}
.date {
  display: flex;
  width: 207px;
  height: 18px;
  flex-direction: column;
  justify-content: flex-end;
  flex-shrink: 0;
  color: #000;
  font-family: SF Pro Display;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 82.938%;
}
.author {
  display: flex;
  width: 207px;
  height: 18px;
  text-decoration: underline;
  flex-direction: column;
  justify-content: flex-end;
  flex-shrink: 0;
  color: #000;
  font-family: SF Pro Display;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 82.938%;
}
.author:hover {
  text-decoration:underline;
}
.topictitle {
  display: flex;
  width: 190px;
  height: 15px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #000;
  font-family: SF Pro Display;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 82.938%;
}
.topiccontent {
  display: flex;
  width: 190px;
  height: 45px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #000000;
  font-family: SF Pro Display;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.buttons {
  display: flex;
  width: 66px;
  flex-direction: row;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
}
.buttons-bottom {
  display: flex;
  width: 66px;
  flex-direction: row;
  align-items: flex-end;
  gap: 8px;
}
.bottom {
  display: flex;
  width: 225px;
  padding: 0px 1px 0px 1px;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
}
.little-black {
  display: flex;
  width: 50px;
  height: 20px;
  padding: 10px;
  background: #131313;
  font: 100% SF Pro Display;
  font-size: 16px;
}
.little-gray {
  display: flex;
  width: 50px;
  height: 20px;
  padding: 10px;
  background: rgb(101, 103, 104);
  font: 100% SF Pro Display;
  font-size: 16px;
}
.little-red {
  display: flex;
  width: 50px;
  height: 20px;
  padding: 10px;
  background: pink;
  font: 100% SF Pro Display;
  font-size: 16px;
}
.responses {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
