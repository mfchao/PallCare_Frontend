<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRoute } from 'vue-router';


const route = useRoute();
const username = route.params.username[0];
const password = route.params.password[0];

const family = ref(false);
const patient = ref(false);
const userType = ref("");
const { createUser, loginUser, updateSession, isFamily } = useUserStore();





async function preferences() {
    if (family.value) {
    userType.value = "family";
  } else if (patient.value) {
    userType.value = "patient";
  }

  await createUser(username, password, userType.value);
  await loginUser(username, password);

  void updateSession();

    if (isFamily) {
        void router.push({ name: "PreferenceF" });
    } else {
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