<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatEntryDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
const emit = defineEmits(["editPost", "refreshPosts"]);
const { currentUsername } = storeToRefs(useUserStore());

const deletePost = async () => {
  try {
    await fetchy(`/api/posts/${props.post._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshPosts");
};
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div class="card">
    <div class="top">
      <text class="date">{{ formatEntryDate(props.post.dateCreated) }}</text>
      <text class="author">by {{ props.post.author }}</text>
    </div>
    <div class="bottom">
      <text class="content">{{ props.post.content }}</text>
      
    </div>    
    <div class="buttons-bottom">
        <button class="little-gray" @click="deletePost"><i class="fa fa-trash"></i></button>
      </div>
  </div>
</template>

<style scoped>
.card {
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
.content {
  display: flex;
  width: 190px;
  height: 45px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #8d8989;
  font-family: SF Pro Display;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.bottom {
  display: flex;
  width: 225px;
  padding: 0px 1px 0px 1px;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
}
.buttons-bottom {
  display: flex;
  width: 66px;
  flex-direction: row-reverse;
  align-items: flex-end;
  gap: 8px;
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
</style>
