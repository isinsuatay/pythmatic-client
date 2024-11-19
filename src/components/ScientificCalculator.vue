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

<style scoped>
.calculator-container {
  z-index: 1000;
  width: 320px;
  height: auto;
  padding: 15px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.calculator-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.calculator-screen {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f8f8f8;
  color: #333;
  text-align: right;
}

.calculator-keys {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  width: 100%;
}

.calc-button {
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

.calc-button:hover {
  background-color: #f0f0f0;
}

.close-button {
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  background-color: transparent;
  font-size: 20px;
  color: #888;
  cursor: pointer;
}
</style>
