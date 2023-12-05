import { defineStore } from "pinia";
import { ref } from "vue";

export const usePreferenceStore = defineStore(
  "preference",
  () => {
    const isPreferenceViewOn = ref(false);

    const setOff = () => {
      isPreferenceViewOn.value = false;
    };

    const setOn = () => {
      isPreferenceViewOn.value = true;
    };

    return {
      isPreferenceViewOn,
      showNav,
      setOff,
      setOn,
    };
  },
  { persist: true },
);
