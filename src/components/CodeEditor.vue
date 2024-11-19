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
      <button @click="runCode"><i class="fas fa-play"></i> Run Code</button>
      <button @click="clearCode">
        <i class="fas fa-trash"></i> Clear Code
      </button>
      <button @click="clearOutput">
        <i class="fas fa-eraser"></i> Clear Output
      </button>
    </div>

    <textarea
      v-model="code"
      :style="{ fontSize: `${fontSize}px` }"
      placeholder="Enter your Python code here..."
      rows="15"
      @input="autoCloseBrackets"
      @keydown="handleBackspace"
    ></textarea>

    <textarea
      v-model="input"
      placeholder="Enter input (if any)..."
      rows="3"
    ></textarea>
    <div v-if="loading" class="loading">Running your code...</div>

    <div v-if="output" ref="outputSection" class="output-section">
      <h3>Output:</h3>
      <pre>{{ output }}</pre>
    </div>

    <div v-if="error" ref="errorSection" class="error">
      <h3>Error:</h3>
      <pre>{{ error }}</pre>
    </div>

    <div v-if="error" class="error">
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
        const response = await axios.post("http://localhost:8000/run-code", {
          code: this.code,
          input: this.input,
        });

        this.output = response.data.output;
        this.error = response.data.error;
      } catch (err) {
        console.error(err);
        this.error = "An error occurred while running the code.";
      } finally {
        this.loading = false;

        // Çıktı varsa çıktı bölümüne kaydır
        if (this.output) {
          this.$nextTick(() => {
            this.$refs.outputSection.scrollIntoView({ behavior: "smooth" });
          });
        }
        // Hata varsa hata bölümüne kaydır
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

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";

.code-editor {
  width: 70vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.5s ease;
}

.font-controls {
  margin-bottom: 10px;
}

.font-controls label {
  margin-right: 10px;
}

.font-controls input[type="range"] {
  width: 100%;
}

textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-family: monospace;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

textarea:focus {
  border-color: #4caf50;
}

.button-group {
  display: flex;
  margin: 10px 0;
  gap: 10px;
}

button {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 15px;
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: transparent;
  background-color: rgba(255, 255, 255, 0.1);
}

button:nth-child(2) {
  background-color: transparent;
  background-color: rgba(255, 255, 255, 0.1);
}

button:nth-child(2):hover {
  background-color: transparent;
}

button:nth-child(3) {
  background-color: transparent;
  background-color: rgba(255, 255, 255, 0.1);
}

button:nth-child(3):hover {
  background-color: transparent;
}

button i {
  font-size: 16px;
}

.loading {
  color: #4caf50;
  font-weight: bold;
}

.output-section {
  margin-top: 20px;
  color: #000;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #e8f5e9;
}

.error {
  color: red;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
