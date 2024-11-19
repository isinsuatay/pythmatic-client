<template>
  <input
    type="text"
    :value="tempValue"
    :disabled="disabled || readOnly"
    :readOnly="readOnly"
    class="styled-input"
    @input="handleChange"
    @blur="handleBlur"
    @keydown="handleKeyDown"
    min="1"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "PyramidCell",
  props: {
    value: {
      type: [Number, null],
      required: true,
    },
    row: {
      type: Number,
      required: true,
    },
    col: {
      type: Number,
      required: true,
    },
    onChange: {
      type: Function,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const tempValue = ref<string>(
      props.value !== null ? props.value.toString() : ""
    );

    // Update tempValue when props.value changes
    watch(
      () => props.value,
      (newValue) => {
        tempValue.value = newValue !== null ? newValue.toString() : "";
      }
    );

    // Allow only numeric input (no letters, symbols, or other characters)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow backspace, delete, arrow keys, and other special keys
      if (
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Tab"
      ) {
        return;
      }

      // Prevent non-numeric characters
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault(); // Block non-numeric input
      }
    };

    // Update tempValue when user inputs and allow only valid numbers
    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      let newValue = target.value;

      // Allow only numbers (remove any non-digit characters)
      if (/[^0-9]/.test(newValue)) {
        newValue = newValue.replace(/[^0-9]/g, ""); // Remove any non-numeric characters
      }

      // Prevent values less than 1
      if (parseInt(newValue) < 1) {
        newValue = "1"; // Set to 1 if less than 1
      }

      tempValue.value = newValue;
    };

    // Send the value to onChange when the input loses focus
    const handleBlur = () => {
      const newValue = parseInt(tempValue.value);
      if (!isNaN(newValue) && newValue >= 1) {
        props.onChange(props.row, props.col, newValue);
      } else {
        // Send null for empty values
        props.onChange(props.row, props.col, null);
      }
    };

    return {
      tempValue,
      handleChange,
      handleBlur,
      handleKeyDown,
    };
  },
});
</script>

<style scoped>
.styled-input {
  background-color: transparent;
  color: #fff;
  font-size: 1.5rem;
  border: 1px solid white;
  width: 80px;
  height: 45px;
  text-align: center;
  margin: 5px;
  border-radius: 8px;
  box-sizing: border-box;
}

.styled-input:disabled {
  background-color: #333;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .styled-input {
    font-size: 1.2rem;
    width: 60px;
    height: 40px;
    margin: 3px;
  }
}

@media (max-width: 480px) {
  .styled-input {
    font-size: 1rem;
    width: 50px;
    height: 35px;
    margin: 2px;
  }
}
</style>
