<template>
  <div class="container">
    <h2 class="heading">Number Pyramid</h2>
    <p class="description">
      Complete this number pyramid by filling in a number for each empty brick
      within the given time. Each cell must contain a value equal to the sum of
      the two cells directly below it. You can only enter a number once, you
      cannot change the numbers you enter.
    </p>
    <div class="timer">Remaining Time: {{ timeLeft }} seconds</div>
    <div v-for="(row, rowIndex) in pyramid" :key="rowIndex" class="cell-row">
      <PyramidCell
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        :value="cell"
        :row="rowIndex"
        :col="colIndex"
        :on-change="handleCellChange"
        :disabled="gameOver"
        :read-only="cell !== null"
      />
    </div>
    <button :disabled="gameOver" @click="checkSolution">Check</button>
    <div class="message">{{ message }}</div>
    <button v-if="gameOver" @click="resetGame">Try Again</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import PyramidCell from "./PyramidCell.vue";
import { generatePyramid } from "./helpers";

export default defineComponent({
  name: "NumberPyramid",
  components: { PyramidCell },
  setup() {
    const pyramid = ref<(number | null)[][]>(generatePyramid());
    const message = ref<string>("");
    const timeLeft = ref<number>(150);
    const gameOver = ref<boolean>(false);

    let timerId: ReturnType<typeof setInterval> | null = null;

    const handleCellChange = (row: number, col: number, value: number) => {
      if (gameOver.value) return;
      pyramid.value[row][col] = value;
    };

    const checkSolution = () => {
      if (gameOver.value) return;
      for (let i = 0; i < pyramid.value.length - 1; i++) {
        for (let j = 0; j < pyramid.value[i].length - 1; j++) {
          if (pyramid.value[i][j] !== null) {
            const leftChild = pyramid.value[i + 1][j];
            const rightChild = pyramid.value[i + 1][j + 1];
            if (
              leftChild === null ||
              rightChild === null ||
              pyramid.value[i][j] !== leftChild + rightChild
            ) {
              message.value = "Try again!";
              return;
            }
          }
        }
      }
      message.value =
        "Congratulations, you have successfully completed the pyramid!";
    };

    const resetGame = () => {
      pyramid.value = generatePyramid();
      message.value = "";
      timeLeft.value = 150;
      gameOver.value = false;
      startTimer();
    };

    const startTimer = () => {
      timerId = setInterval(() => {
        if (timeLeft.value > 0) {
          timeLeft.value -= 1;
        } else {
          if (timerId) {
            clearInterval(timerId);
          }
          gameOver.value = true;
          message.value = "Time is up! Please try again.";
        }
      }, 1000);
    };

    onMounted(() => {
      startTimer();
    });

    return {
      pyramid,
      message,
      timeLeft,
      gameOver,
      handleCellChange,
      checkSolution,
      resetGame,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
  padding: 20px;
}

.heading {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.timer {
  font-size: 2rem;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 20px;
}

.cell-row {
  display: flex;
  justify-content: center;
}

button {
  background-color: #6e45e2;
  color: #fff;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  margin: 10px;
  width: 100px;
}

button:hover {
  background-color: #5a2b9a;
}

.message {
  color: #fff;
  font-size: 1rem;
  margin-top: 10px;
}

.description {
  max-width: 100%;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1rem;
  color: #fff;
  line-height: 1.5;
  word-wrap: break-word;
}
</style>
