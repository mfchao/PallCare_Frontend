import { defineStore } from "pinia";
import { ref } from "vue";

export const usePreferenceStore = defineStore(
  "preference",
  () => {
    const isPreferenceViewOn = ref(false);

    const togglePreferenceView = () => {
      isPreferenceViewOn.value = !isPreferenceViewOn.value;
    };

    return {
      isPreferenceViewOn,
      togglePreferenceView,
    };
  },
  { persist: true },
);
