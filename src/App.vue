<template>
  <div id="app">
    <DefaultLayout>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </DefaultLayout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default defineComponent({
  components: {
    DefaultLayout,
  },
});
</script>
