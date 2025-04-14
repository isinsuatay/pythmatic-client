<template>
  <div class="calculator-container" tabindex="0" @keydown="handleKeydown">
    <div class="calculator-wrapper">
      <input type="text" class="calculator-screen" :value="input" disabled />
      <div class="calculator-keys">
        <div v-for="(row, rowIndex) in buttons" :key="rowIndex">
          <button
            v-for="button in row"
            :key="button"
            class="calc-button"
            @click="handleClick(button)"
          >
            {{ button }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import * as math from "mathjs";

export default {
  setup() {
    const input = ref("");

    const buttons = [
      ["1", "4", "7", "/"],
      ["2", "5", "8", "*"],
      ["3", "6", "9", "-"],
      ["0", ".", "=", "+"],
      ["C", "(", ")", "log("],
      ["sin(", "cos(", "tan(", "^"],
      ["sqrt", "pi", "e", "abs"],
      ["integrate", "derivative"],
    ];

    const handleClick = (value) => {
      if (value === "=") {
        try {
          const result = math.evaluate(input.value);
          input.value = result.toString();
        } catch (error) {
          input.value = "Error";
        }
      } else if (value === "C") {
        input.value = "";
      } else {
        input.value += value;
      }
    };

    const handleKeydown = (event) => {
      const key = event.key;
      if (key === "Enter") {
        handleClick("=");
      } else if (key === "Backspace") {
        input.value = input.value.slice(0, -1);
      } else if (key === "Escape") {
        handleClick("C");
      } else if ("0123456789/*-+().".includes(key)) {
        handleClick(key);
      }
    };

    onMounted(() => {
      document.querySelector(".calculator-container").focus();
    });

    return {
      input,
      buttons,
      handleClick,
      handleKeydown,
    };
  },
};
</script>
