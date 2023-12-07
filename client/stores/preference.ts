import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { BodyT, fetchy } from "@/utils/fetchy";

export const usePreferenceStore = defineStore(
  "preference",
  () => {
    let isPreferenceViewOn = ref(false);

    const showNav = computed(() => isPreferenceViewOn.value !== false);

    const setOff = () => {
      isPreferenceViewOn.value = false;
    };

    const setOn = () => {
      isPreferenceViewOn.value = true;
    };

    const updatePreferences = async (patch: BodyT) => {
      await fetchy("/api/preferences", "PATCH", { body: { update: patch } });
    };

    return {
      isPreferenceViewOn,
      showNav,
      setOff,
      setOn,
      updatePreferences,
    };
  },
  { persist: true },
);
