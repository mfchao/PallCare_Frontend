import { defineStore } from "pinia";

import { fetchy } from "@/utils/fetchy";
export const useWishStore = defineStore(
  "wish",
  () => {
    const getWishesByAuthor = async (username: string) => {
      return await fetchy(`/api/wishes/${username}`, "GET");
    };

    return {
      getWishesByAuthor,
    };
  },
  { persist: true },
);
