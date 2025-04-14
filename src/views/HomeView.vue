<template>
  <div class="home">
    <FlyingCards />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FlyingCards from "@/components/FlyingCards.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    FlyingCards,
  },
});
</script>
