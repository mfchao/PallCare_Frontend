<script setup lang = "ts">
import router from "@/router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import UpdateWishForm from "../components/Wish/UpdateUserForm.vue";

const { currentUsername } = storeToRefs(useUserStore());




</script>