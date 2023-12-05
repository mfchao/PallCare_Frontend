import { defineStore } from "pinia";

import { BodyT, fetchy } from "@/utils/fetchy";
import { ObjectId } from "mongodb";
export const useTCStore = defineStore(
  "timeCapsule",
  () => {
    const getReleaseDate = async () => {
      const pref = await fetchy("/api/preferences", "GET");
      const date = new Date();
      date.setDate(date.getDate() + pref.timeCapsule);
      return date;
    };

    const getSelectContent = async (username: string) => {
      return await fetchy(`/api/timecapsule/${username}`, "GET");
    };

    const getDiariesAndWishes = async (username: string) => {
      const diaries = await fetchy(`/api/diary/entries/${username}`, "GET");
      const wishes = await fetchy(`/api/wishes/${username}`, "GET");
      return [...diaries, ...wishes].sort((a, b) => (a.dateUpdated >= b.dateUpdated ? 1 : -1));
    };

    const addToTimeCapsule = async (username: string, contentID: ObjectId, type: "Diary" | "Letter" | "Wish", behavior: "send" | "delete") => {
      const body: BodyT = { username, type, behavior };
      await fetchy(`/api/timecapsule/${contentID}`, "POST", { body });
    };

    const removeFromTimeCapsule = async (delay: ObjectId) => {
      await fetchy(`/api/delay/${delay}`, "DELETE");
    };

    return {
      getReleaseDate,
      getSelectContent,
      getDiariesAndWishes,
      addToTimeCapsule,
      removeFromTimeCapsule,
    };
  },
  { persist: true },
);
