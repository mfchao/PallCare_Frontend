import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const usePreferenceStore = defineStore(
  "preference",
  () => {
    let isPreferenceViewOn = ref(false);

    const showNav = computed(() => isPreferenceViewOn.value !== false);

    const togglePreferenceView = () => {
      isPreferenceViewOn.value = !isPreferenceViewOn.value;
    };

    const setOff = () => {
      console.log("Setting preference view off");
      isPreferenceViewOn.value = false;
      console.log(isPreferenceViewOn.value);
    };

    const setOn = () => {
      console.log("Setting preference view on");
      isPreferenceViewOn.value = true;
      console.log(isPreferenceViewOn.value);
    };

    return {
      isPreferenceViewOn,
      showNav,
      togglePreferenceView,
      setOff,
      setOn,
    };
  },
  { persist: true },
);
