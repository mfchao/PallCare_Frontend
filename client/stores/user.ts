import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { BodyT, fetchy } from "@/utils/fetchy";

export const useUserStore = defineStore(
  "user",
  () => {
    const currentUsername = ref("");

    // is patient or family
    const userType = ref("");

    const isLoggedIn = computed(() => currentUsername.value !== "");

    // is patient or family state
    const isFamily = computed(() => userType.value === "family");

    const resetStore = () => {
      currentUsername.value = "";
    };

    const createUser = async (username: string, password: string, userType: string) => {
      await fetchy("/api/users", "POST", {
        body: { username, password, userType },
      });
    };

    const loginUser = async (username: string, password: string) => {
      await fetchy("/api/login", "POST", {
        body: { username, password },
      });
    };

    const updateSession = async () => {
      try {
        const { username } = await fetchy("/api/session", "GET", { alert: false });
        const { userType } = await fetchy("/api/session", "GET", { alert: false });
        currentUsername.value = username;
        userType.value = userType;
      } catch {
        currentUsername.value = "";
        userType.value = "";
      }
    };

    const logoutUser = async () => {
      await fetchy("/api/logout", "POST");
      resetStore();
    };

    const updateUser = async (patch: BodyT) => {
      await fetchy("/api/users", "PATCH", { body: { update: patch } });
    };

    const deleteUser = async () => {
      await fetchy("/api/users", "DELETE");
      resetStore();
    };

    return {
      currentUsername,
      isLoggedIn,
      userType,
      isFamily,
      createUser,
      loginUser,
      updateSession,
      logoutUser,
      updateUser,
      deleteUser,
    };
  },
  { persist: true },
);
