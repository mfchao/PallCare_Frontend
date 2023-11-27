<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";

import { useRoute } from 'vue-router';


const route = useRoute();
// const username = route.params.username as string;
// const password = route.params.password as string;


const family = ref(false);
const patient = ref(false);
const userType = ref("");
const { isFamily, updateUser, getUserType, getUsers } = useUserStore();
const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());


async function preferences() {
    if (family.value) {
    userType.value = "family";
  } else if (patient.value) {
    userType.value = "patient";
  }

  await updateUser({ userType: userType.value });
  void getUserType();

  if (family.value) {
      void router.push({ name: "PreferenceF" });
  } else if (patient.value) {
    void router.push({ name: "PreferenceP" });
  }
}

</script>

<template>
  <main class="centered">

    <h1>Select Account Type</h1>
    <section>
        <div class="pure-control-group ">
            <input class="checkbox" type="checkbox" v-model.trim="family" id="aligned-family" />
            <div class="labels">
            <label for="aligned-password">I am a patient's contact (family, friends).</label>
            </div>
          </div>
          <div class="pure-control-group ">
            <input class="checkbox" type="checkbox" v-model.trim="patient" id="aligned-patient" />
            <div class="labels">
              <label for="aligned-password">I am a patient.</label>
            </div>
          </div>
    </section>
    <button @click="preferences" > Next</button>

  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
