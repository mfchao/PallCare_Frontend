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

    const createPatientPasscode = async (passcode: string) => {
      return await fetchy("/api/contact/passcode", "POST", {body:{passcode}})
    };

    const verifyPatientPasscode = async (patientname:string, passcode: string) => {
      return await fetchy(`/api/contact/passcode/verified`, "POST", {body:{patientname, passcode}})
    }

    const boundwithpatient = async (patientname:string) => {
      return await fetchy(`/api/contact/bound`, "POST", {body:{patientname}})
    }

    return {
      isPreferenceViewOn,
      showNav,
      setOff,
      setOn,
      updatePreferences,
      createPatientPasscode,
      verifyPatientPasscode,
      boundwithpatient,
    };
  },
  { persist: true },
);
