<template>
  <div class="game-container">
    <ul class="pagination-list">
      <li
        v-for="(component, index) in allComponents"
        :key="index"
        :class="{ active: index === currentPage - 1 }"
      >
        <button class="page-link" @click="paginate(index + 1)">
          <span>{{ index + 1 }}</span>
        </button>
      </li>
    </ul>
    <component :is="currentComponents[0]" />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import LetterPuzzle from "../components/LetterPuzzle.vue";
import PyramidGame from "../components/PyramidGame/NumberPyramid.vue";

export default {
  name: "GamesView",
  components: {
    LetterPuzzle,
    PyramidGame,
  },
  setup() {
    const currentPage = ref(1);
    const componentsPerPage = 1;

    const allComponents = [LetterPuzzle, PyramidGame];

    const indexOfLastComponent = computed(
      () => currentPage.value * componentsPerPage
    );
    const indexOfFirstComponent = computed(
      () => indexOfLastComponent.value - componentsPerPage
    );
    const currentComponents = computed(() =>
      allComponents.slice(
        indexOfFirstComponent.value,
        indexOfLastComponent.value
      )
    );

    const paginate = (pageNumber) => {
      currentPage.value = pageNumber;
    };

    return {
      currentPage,
      allComponents,
      currentComponents,
      paginate,
    };
  },
};
</script>
