import { fetchy } from "@/utils/fetchy";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useForumStore = defineStore(
  "forum",
  () => {
    const isInTopic = ref(false);
    const currentTopic = ref<Record<string, any>>({});
    const pagenumber = ref(1);

    const resetStore = () => {
      isInTopic.value = false;
      currentTopic.value = {};
      pagenumber.value = 1;
    };

    const updateCurrentTopic = async () => {
      currentTopic.value = await getTopic(currentTopic.value._id);
    };

    const enterTopic = async (topicId: string) => {
      isInTopic.value = true;
      currentTopic.value = await getTopic(topicId);
    };

    const exitTopic = () => {
      isInTopic.value = false;
      currentTopic.value = {};
    };

    const getTopics = async () => {
      return await fetchy(`/api/topics?page=${pagenumber.value}`, "GET");
    };

    const getTopic = async (topicId: string) => {
      return await fetchy(`/api/topics/${topicId}`, "GET");
    };

    const createTopic = async (title: string, body: string) => {
      await fetchy("/api/topics", "POST", { body: { title, body } });
    };

    const isAuthor = async (topicId: string) => {
      const topic = await fetchy(`/api/topics/${topicId}`, "GET");
      const user = await fetchy("/api/session", "GET");
      return topic.author.toString() === user.username.toString();
    };

    return {
      isInTopic,
      currentTopic,
      pagenumber,
      resetStore,
      enterTopic,
      exitTopic,
      getTopics,
      getTopic,
      createTopic,
      isAuthor,
      updateCurrentTopic,
    };
  },
  { persist: true },
);
