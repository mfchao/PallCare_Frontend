<script setup lang = "ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const { currentUsername } = storeToRefs(useUserStore());




</script>