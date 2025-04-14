<template>
  <div class="code-editor">
    <h2>Python Code Editor</h2>

    <div class="font-controls">
      <label for="fontSizeRange">Font Size: {{ fontSize }}px</label>
      <input
        id="fontSizeRange"
        v-model="fontSize"
        type="range"
        min="10"
        max="30"
        @input="adjustFontSize"
      />
    </div>

    <div class="button-group">
      <!-- Run button -->
      <button @click="runCode" class="code-editor-button run-button">
        <i class="fas fa-play"></i> Run Code
      </button>

      <!-- Clear Code Button -->
      <button @click="clearCode" class="code-editor-button clear-button">
        <i class="fas fa-trash"></i> Clear Code
      </button>

      <!-- Clear Output Button -->
      <button
        @click="clearOutput"
        class="code-editor-button clear-output-button"
      >
        <i class="fas fa-eraser"></i> Clear Output
      </button>
    </div>

    <!-- Code Input -->
    <textarea
      v-model="code"
      :style="{ fontSize: `${fontSize}px` }"
      placeholder="Enter your Python code here..."
      rows="15"
      @input="autoCloseBrackets"
      @keydown="handleBackspace"
    ></textarea>

    <!-- User Input -->
    <textarea
      v-model="input"
      placeholder="Enter input (if any)..."
      rows="3"
    ></textarea>

    <!-- Loading -->
    <div v-if="loading" class="loading">Running your code...</div>

    <!-- Output -->
    <div v-if="output" ref="outputSection" class="output-section">
      <h3>Output:</h3>
      <pre>{{ output }}</pre>
    </div>

    <!-- Error -->
    <div v-if="error" ref="errorSection" class="error">
      <h3>Error:</h3>
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      code: "",
      input: "",
      output: null,
      error: null,
      loading: false,
      fontSize: 16,
    };
  },
  methods: {
    async runCode() {
      this.loading = true;
      this.output = null;
      this.error = null;

      try {
        const response = await axios.post(
          "https://pythmatic-backend-nodejs.onrender.com/run-code",
          {
            code: this.code,
            input: this.input,
          }
        );

        this.output = response.data.output;
        this.error = response.data.error;
      } catch (err) {
        console.error(err);
        this.error = "An error occurred while running the code.";
      } finally {
        this.loading = false;

        if (this.output) {
          this.$nextTick(() => {
            this.$refs.outputSection.scrollIntoView({ behavior: "smooth" });
          });
        }

        if (this.error) {
          this.$nextTick(() => {
            this.$refs.errorSection.scrollIntoView({ behavior: "smooth" });
          });
        }
      }
    },
    adjustFontSize() {
      // This method is called when the range input is adjusted
    },
    autoCloseBrackets(event) {
      const textarea = event.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const char = this.code[start - 1];

      let closingChar = null;

      if (char === "(") closingChar = ")";
      else if (char === "[") closingChar = "]";
      else if (char === "{") closingChar = "}";
      else if (char === "'") closingChar = "'";
      else if (char === '"') closingChar = '"';

      if (closingChar) {
        this.code =
          this.code.slice(0, start) + closingChar + this.code.slice(end);
        this.$nextTick(() => {
          textarea.setSelectionRange(start, start);
        });
      }
    },
    handleBackspace(event) {
      if (event.key === "Backspace") {
        const textarea = event.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const prevChar = this.code[start - 1];
        const nextChar = this.code[start];

        if (
          (prevChar === "(" && nextChar === ")") ||
          (prevChar === "[" && nextChar === "]") ||
          (prevChar === "{" && nextChar === "}") ||
          (prevChar === "'" && nextChar === "'") ||
          (prevChar === '"' && nextChar === '"')
        ) {
          event.preventDefault();
          this.code = this.code.slice(0, start - 1) + this.code.slice(end + 1);
          this.$nextTick(() => {
            textarea.setSelectionRange(start - 1, start - 1);
          });
        }
      }
    },
    clearCode() {
      this.code = "";
    },
    clearOutput() {
      this.output = null;
      this.error = null;
    },
  },
};
</script>
