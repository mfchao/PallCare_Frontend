<script setup lang="ts">
import EditTopicForm from '../../components/Forum/EditTopicForm.vue';

const props = defineProps({
  _id: String
});
</script>

<template>
  <body>
    <EditTopicForm :_id="props._id"/>
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
</style>