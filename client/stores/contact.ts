import { defineStore } from "pinia";

import { fetchy } from "@/utils/fetchy";

export const useContactStore = defineStore(
  "contact",
  () => {
    const createEmailContact = async (username: string, email: string) => {
      await fetchy("/api/contact/email", "POST", {
        body: { username, email },
      });
    };

    const createUserContact = async (contact: string) => {
      await fetchy("/api/contact", "POST", {
        body: { contact },
      });
    };

    const getContacts = async () => {
      return await fetchy(`/api/contact`, "GET");
    };

    return {
      createEmailContact,
      createUserContact,
      getContacts,
    };
  },
  { persist: true },
);
