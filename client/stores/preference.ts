import { defineStore } from "pinia";
import { ref } from "vue";

export const usePreferenceStore = defineStore(
  "preference",
  () => {
    const isPreferenceViewOn = ref(false);

<<<<<<< Updated upstream
    const togglePreferenceView = () => {
      isPreferenceViewOn.value = !isPreferenceViewOn.value;
=======
    const setOff = () => {
      isPreferenceViewOn.value = false;
    };

    const setOn = () => {
      isPreferenceViewOn.value = true;
>>>>>>> Stashed changes
    };

    return {
      isPreferenceViewOn,
<<<<<<< Updated upstream
      togglePreferenceView,
=======
      showNav,
      setOff,
      setOn,
>>>>>>> Stashed changes
    };
  },
  { persist: true },
);
