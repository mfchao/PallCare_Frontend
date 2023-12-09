import { defineStore } from "pinia";
import { ref } from "vue";

import { BodyT, fetchy } from "@/utils/fetchy";

export const usePreferenceStore = defineStore(
  "preference",
  () => {
    const patientUsername = ref("");

    const fontSize = ref("medium");

    const updatePreferences = async (patch: BodyT) => {
      await fetchy("/api/preferences", "PATCH", { body: { update: patch } });
    };

    const createPatientPasscode = async (passcode: string) => {
      return await fetchy("/api/contact/passcode", "POST", { body: { passcode } });
    };

    const verifyPatientPasscode = async (patientname: string, passcode: string) => {
      return await fetchy(`/api/contact/passcode/verified`, "POST", { body: { patientname, passcode } });
    };

    const boundwithpatient = async (patientname: string) => {
      patientUsername.value = patientname;
      return await fetchy(`/api/contact/bound`, "POST", { body: { patientname } });
    };

    const getPreferences = async () => {
      let font;
      try {
        font = await fetchy("/api/preferences", "GET", { alert: false });
        fontSize.value = font.fontSize;
      } catch {
        fontSize.value = "medium";
      }
    };

    const resetStore = () => {
      patientUsername.value = "";
      fontSize.value = "medium";
    };

    return {
      patientUsername,
      fontSize,
      updatePreferences,
      createPatientPasscode,
      verifyPatientPasscode,
      boundwithpatient,
      getPreferences,
      resetStore,
    };
  },
  { persist: true },
);
