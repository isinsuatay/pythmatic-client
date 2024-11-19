<template>
  <div id="app">
    <SideBar />
    <router-view />

    <button
      class="open-calculator-button"
      aria-label="Open Calculator"
      @click="openCalculator"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="calculator-icon"
        aria-hidden="true"
      >
        <path
          d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm1 4v2h10V6H7zm0 4v2h4v-2H7zm6 0v2h4v-2h-4zM7 14v2h4v-2H7zm6 0v2h4v-2h-4zM7 18v2h10v-2H7z"
        />
      </svg>
    </button>

    <!-- CalculatorModal -->
    <CalculatorModal @open-calculator="registerOpenFunction" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from "vue";
import SideBar from "./components/MainSidebar.vue";
import CalculatorModal from "./modals/CalculatorModal.vue";

export default defineComponent({
  components: {
    SideBar,
    CalculatorModal,
  },
  setup() {
    const calculatorModal: Ref<(() => void) | null> = ref(null);

    const registerOpenFunction = (openFunction: () => void) => {
      calculatorModal.value = openFunction;
    };

    const openCalculator = () => {
      calculatorModal.value?.();
    };

    return { openCalculator, registerOpenFunction };
  },
});
</script>

<style src="./App.css"></style>
