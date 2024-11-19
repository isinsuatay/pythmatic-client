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

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
}

.pagination-list {
  display: flex;
  position: absolute;
  bottom: 20px;
  list-style: none;
}

.pagination-list li {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 5px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 20px;
}

.pagination-list li.active {
  background-color: #ccc;
}

.page-link {
  background: none;
  border: none;
  color: #333;
  font: inherit;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
}

.page-link:focus {
  outline: none;
}
</style>
