<script setup lang = "ts">
import WishListComponent from '../../components/Wish/WishListComponent.vue';
import router from '../../router';

</script>

<template>
  <body>
    <div class="navigation">
      <img @click="router.push({ name: 'Home' })" src="@/assets/images/home.png"/>
      <text class="pagetitle">WISH</text>
    </div>
    <div class="pageexplainationdiv">
      <text class="pageexplaination">Wish is a place where you are encouraged to write down your wishes and share it with your loved ones.</text>
    </div>
    <div class="creatediv" @click="router.push({ name: 'CreateWish' })">
      <text class="createdivtitle">Create a new wish!</text>
      <div class="blank">
        <img src="@/assets/images/wishicon.png" style="height: 200%; width: fit-content;"/> 
      </div>
    </div>
    <WishListComponent />
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
  gap: 15px;
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

.navigation{
  display: flex;
  width: 300px;
  align-items: center;
  gap: 23px;
}

.pageexplaination{
  width: 300px;
  height: 45px;
  color: #131313;
  font-family: SF Pro Display;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.pageexplainationdiv{
  display: flex;
  width: 300px;
  height: 45px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #131313;
  padding-top: 10px;
  font-family: SF Pro Display;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.creatediv{
  display: flex;
  width: 290px;
  height: 89px;
  padding-left: 14px;
  align-items: center;
  gap: 39px;
  flex-shrink: 0;
  background: #FFFFFF;
  border-radius: 10px;
}

.createdivtitle{
  display: flex;
  width: 162px;
  height: 57px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #131313;
  font-family: SF Pro Display;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.blank{
  display: flex;
  width: 50px;
  height: 50px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #131313;
  font-family: SF Pro Display;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
</style>