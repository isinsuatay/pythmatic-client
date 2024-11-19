<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="isVisible"
      class="calculator-modal"
      :style="{ top: position.top + 'px', left: position.left + 'px' }"
      @mousedown="startDrag"
    >
      <button class="close-button" @click="closeCalculator">X</button>
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

    // References for modal position
    const position = ref({ top: 100, left: 100 });
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

<style scoped>
.calculator-modal {
  position: fixed;
  width: 320px;
  padding: 20px;
  background-color: transparent;
  border: none;
  cursor: move; /* Indicates draggable */
  z-index: 1000;
}

.close-button {
  position: absolute;
  top: 0;
  right: -10px;
  border: none;
  background-color: transparent;
  font-size: 18px;
  cursor: pointer;
  font-weight: 900;
}

/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95); /* Scale down effect on entry */
}
</style>
