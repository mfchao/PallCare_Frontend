<script setup lang="ts">
import { usePreferenceStore } from "@/stores/preference";
import { storeToRefs } from "pinia";
import { defineAsyncComponent, onBeforeMount, ref } from "vue";
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";

const WishComponent = defineAsyncComponent(() => import("./WishComponent.vue"));
const { isLoggedIn } = storeToRefs(useUserStore());
const { patientUsername } = storeToRefs(usePreferenceStore());
const { currentUsername, isContact, isAuthor } = useUserStore();
const props = defineProps(["username"]);
const loaded = ref(false);
let wishes = ref<Array<Record<string, string>>>([]);

function canView(wish: any) {
  return wish.visibility === "public" || isAuthor(wish.author) || (wish.visibility === "contacts" && isContact(wish.author));
}

async function getWishes(author?: string) {
  let wishResults;
  try {
    if (author) {
      wishResults = await fetchy(`/api/wishes/${author}`, "GET");
      wishResults = wishResults.filter((wish: any) => canView(wish));
    } else {
      wishResults = await fetchy("/api/wishes", "GET");
    }
  } catch (_) {
    return;
  }
  wishes.value = wishResults;
}

onBeforeMount(async () => {
  if (props.username) {
    await getWishes(props.username);
  } else {
    await getWishes(currentUsername);
  }
  loaded.value = true;
});
</script>

<template>
  <section class="wishes" v-if="loaded && wishes.length !== 0">
    <article v-for="wish in wishes" :key="wish._id">
      <Suspense>
        <WishComponent :wish="wish" @refreshWishes="getWishes" />
      </Suspense>
    </article>
  </section>
  <p v-else-if="loaded">No wishes found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
.wishes {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
