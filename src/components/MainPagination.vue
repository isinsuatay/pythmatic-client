<template>
  <div class="main-pagination">
    <button
      class="pagination-button"
      :disabled="currentPage === 1"
      @click="$emit('update:currentPage', currentPage - 1)"
    >
      Prev
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      class="pagination-button"
      :class="{ active: page === currentPage }"
      @click="$emit('update:currentPage', page)"
    >
      {{ page }}
    </button>

    <button
      class="pagination-button"
      :disabled="currentPage === totalPages"
      @click="$emit('update:currentPage', currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainPagination",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  computed: {
    visiblePages(): number[] {
      const maxButtons = 5;
      let start = Math.max(1, this.currentPage - Math.floor(maxButtons / 2));
      let end = Math.min(this.totalPages, start + maxButtons - 1);

      if (end - start < maxButtons - 1) {
        start = Math.max(1, end - maxButtons + 1);
      }

      const pages: number[] = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
});
</script>

<style>
.main-pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 10px;

  .pagination-button {
    padding: 10px 16px;
    font-size: 14px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    backdrop-filter: blur(4px);
    background: rgba(123, 97, 255, 0.1);
    color: #d1c4ff;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(123, 97, 255, 0.15);

    &:hover {
      background: rgba(123, 97, 255, 0.3);
      color: white;
      transform: translateY(-2px);
    }

    &.active {
      background: rgba(123, 97, 255, 0.5);
      color: white;
      font-weight: bold;
      box-shadow: 0 4px 15px rgba(123, 97, 255, 0.35);
    }

    &:disabled {
      background: rgba(255, 255, 255, 0.05);
      color: #aaa;
      cursor: not-allowed;
      box-shadow: none;
    }
  }
}
</style>
