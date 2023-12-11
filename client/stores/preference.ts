import { defineStore } from "pinia";
import { ref } from "vue";

import { BodyT, fetchy } from "@/utils/fetchy";

export const usePreferenceStore = defineStore(
  "preference",
  () => {
    const patientUsername = ref("");

    const fontSize = ref("medium");

    const timeCapsule = ref(14);

    const visualAid = ref(false);

    const age = ref("under 18");

    const updatePrefStore = async () => {
      const pref = await getPreferences();
      fontSize.value = pref.fontSize;
      timeCapsule.value = pref.timeCapsule;
      visualAid.value = pref.visualAid;
      age.value = pref.age;
    };

    const getPreferences = async () => {
      return await fetchy("/api/preferences", "GET", { alert: false });
    };

    const updatePreferences = async (patch: BodyT) => {
      await fetchy("/api/preferences", "PATCH", { body: { update: patch } });
      await updatePrefStore();
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

    const getBoundPatientNamebyContactUsername = async (username: string) => {
      try {
        const patient_username = await fetchy(`/api/contact/${username}`, "GET", { alert: false });
        patientUsername.value = patient_username;
      } catch (error) {
        console.log(error);
        patientUsername.value = "";
      }
    };

    const resetStore = () => {
      patientUsername.value = "";
    };

    return {
      patientUsername,
      fontSize,
      timeCapsule,
      visualAid,
      age,
      updatePrefStore,
      updatePreferences,
      createPatientPasscode,
      verifyPatientPasscode,
      boundwithpatient,
      getBoundPatientNamebyContactUsername,
      getPreferences,
      resetStore,
    };
  },
  { persist: true },
);
