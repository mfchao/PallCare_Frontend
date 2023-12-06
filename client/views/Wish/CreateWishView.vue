<script setup lang="ts">
import CreateWishForm from '../../components/Wish/CreateWishForm.vue';
import router from '../../router';
</script>

<template>
  <body>
    <div class="navigation">
        <img @click="router.push({ name: 'Wish' })" src="@/assets/images/back.svg"/>
        <h1>New Wish</h1>
    </div>
    <CreateWishForm/>
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
  background:#F0E7D8;
}
.navigation {
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 1rem;
height: 4rem;
background-color: #F5F5F5;
border-bottom: 1px solid #E0E0E0;
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
