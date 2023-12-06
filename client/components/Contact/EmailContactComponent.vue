<script setup lang="ts">
import { useContactStore } from "../../stores/contact";

const { getContacts} = useContactStore();

const props = defineProps(["emailUser"]);
</script>

<template>
    <main>
        <div class="user">
            <img src="@/assets/images/user.svg"/>
            <p>{{props.emailUser.email}}</p>
        </div>
    </main>
</template>

<style scoped>
h1 {
    text-align: center;
}

.user {
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 10px;
    margin-bottom: 10px;
  }

    
</style>