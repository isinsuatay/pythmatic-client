<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="isVisible"
      class="calculator-modal"
      :style="{ top: position.top + 'px', left: position.left + 'px' }"
      @mousedown="startDrag"
    >
      <button class="calculator-close-button" @click="closeCalculator">
        X
      </button>
      <Calculator />
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Calculator from "../components/ScientificCalculator.vue";

export default defineComponent({
  components: { Calculator },
  emits: ["openCalculator"],
  setup(_, { emit }) {
    const isVisible = ref(false);

    const position = ref({ top: 100, left: window.innerWidth - 350 });
    const isDragging = ref(false);
    const offset = ref({ x: 0, y: 0 });

    const openCalculator = () => {
      isVisible.value = true;
    };

    const closeCalculator = () => {
      isVisible.value = false;
    };

    // Start dragging
    const startDrag = (event: MouseEvent) => {
      isDragging.value = true;
      offset.value.x = event.clientX - position.value.left;
      offset.value.y = event.clientY - position.value.top;

      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", stopDrag);
    };

    // Dragging function
    const drag = (event: MouseEvent) => {
      if (isDragging.value) {
        position.value.top = event.clientY - offset.value.y;
        position.value.left = event.clientX - offset.value.x;
      }
    };

    // Stop dragging
    const stopDrag = () => {
      isDragging.value = false;
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", stopDrag);
    };

    onMounted(() => {
      emit("openCalculator", openCalculator);
    });

    return { isVisible, openCalculator, closeCalculator, position, startDrag };
  },
});
</script>
