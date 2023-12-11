<script setup lang="ts">
import { useNavigationStore } from "@/stores/navigation";
import { onBeforeMount } from "vue";
import CreateWishForm from "../../components/Wish/CreateWishForm.vue";
import router from "../../router";

const { setNavOff, setNavOn } = useNavigationStore();

function back()  {
  setNavOn();
  router.push({ name: 'Wish' })
}

onBeforeMount(async()=> {
  setNavOff();
})
</script>

<template>
  <body>
    <div class="navigation">
      <img @click="back" src="@/assets/images/back.svg" />
      <text class="pagetitle">New Wish</text>
    </div>
    <CreateWishForm />
  </body>
</template>

<style scoped>
body {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 60px 18px 120px 18px;
  justify-content: space-between;
  flex-direction: column;
  background: #f0e7d8;
}
.pagetitle{
  display: flex;
  width: 240px;
  height: 45px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #131313;
  font-family: New York;
  font-size: 35px;
  font-style: normal;
  font-weight: 496;
  line-height: normal;
  text-transform: uppercase;
}
.navigation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 13px;
}

.navigation img {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
}
.navigation h1 {
  font-size: 1.5rem;
  font-weight: 500;
  color: #333333;
}
</style>
