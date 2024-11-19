<template>
  <div class="puzzle-container">
    <h3>LETTER PUZZLE</h3>
    <h5>
      Place a letter from A to H in each empty square without repeating any
      letter in the same row or column. Also, the same letters cannot touch
      diagonally.
    </h5>
    <table class="board">
      <tbody>
        <tr v-for="(row, rowIndex) in board" :key="rowIndex">
          <td
            v-for="(col, colIndex) in row"
            :key="colIndex"
            :class="{
              selected:
                selectedCell &&
                selectedCell.row === rowIndex &&
                selectedCell.col === colIndex,
            }"
            :style="{
              cursor:
                initialBoard[rowIndex][colIndex] === ''
                  ? 'pointer'
                  : 'not-allowed',
              backgroundColor: col === '' ? 'white' : '#f0f0f0',
            }"
            @click="handleCellClick(rowIndex, colIndex)"
          >
            {{ col }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="letters-container">
      <p>Selected Letter: {{ selectedLetter }}</p>
      <div class="letter-buttons">
        <button
          v-for="letter in (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as SquareValue[])"
          :key="letter"
          :disabled="selectedLetter === letter || isGameComplete"
          :style="{
            backgroundColor: selectedLetter === letter ? '#ccc' : 'transparent',
          }"
          @click="handleLetterClick(letter)"
        >
          {{ letter }}
        </button>
      </div>
    </div>
    <p v-if="isGameComplete">
      {{
        isCorrect
          ? "Game completed! Congratulations!"
          : "Wrong solution! Try again."
      }}
    </p>
    <button
      class="finish-button"
      :disabled="isGameComplete"
      @click="handleFinishGame"
    >
      Finish Game
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

type SquareValue = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "";

export default defineComponent({
  name: "LetterPuzzle",
  setup() {
    const gameBoards: SquareValue[][][] = [
      [
        ["F", "", "", "", "", "", "", "C"],
        ["", "", "G", "", "", "C", "", ""],
        ["", "C", "", "A", "B", "", "G", ""],
        ["", "", "B", "C", "D", "E", "", ""],
        ["", "", "E", "G", "A", "F", "", ""],
        ["", "A", "", "F", "E", "", "H", ""],
        ["", "", "H", "", "", "A", "", ""],
        ["A", "", "", "", "", "", "", "B"],
      ],
      [
        ["", "F", "", "", "", "", "D", ""],
        ["G", "E", "", "", "", "", "F", "B"],
        ["", "", "", "H", "B", "", "", ""],
        ["", "", "D", "", "", "G", "", ""],
        ["", "", "C", "", "", "D", "", ""],
        ["", "", "", "G", "C", "", "", ""],
        ["F", "H", "", "", "", "", "G", "C"],
        ["", "D", "", "", "", "", "B", ""],
      ],
      [
        ["", "", "", "D", "C", "", "", ""],
        ["", "", "A", "", "", "F", "", ""],
        ["", "B", "D", "", "", "G", "H", ""],
        ["C", "", "", "", "", "", "", "A"],
        ["A", "", "", "", "", "", "", "B"],
        ["", "F", "C", "", "", "B", "D", ""],
        ["", "", "G", "", "", "E", "", ""],
        ["", "", "", "H", "B", "", "", ""],
      ],
      [
        ["", "A", "H", "", "", "G", "B", ""],
        ["B", "D", "", "", "", "", "A", "F"],
        ["A", "", "", "", "", "", "", "H"],
        ["", "", "", "E", "H", "", "", ""],
        ["", "", "", "B", "A", "", "", ""],
        ["E", "", "", "", "", "", "", "G"],
        ["F", "G", "", "", "", "", "D", "C"],
        ["", "H", "F", "", "", "C", "E", ""],
      ],
    ];

    const getRandomBoard = () => {
      const randomIndex = Math.floor(Math.random() * gameBoards.length);
      return gameBoards[randomIndex];
    };

    const board = ref<SquareValue[][]>(getRandomBoard());
    const initialBoard = ref<SquareValue[][]>(getRandomBoard());
    const isGameComplete = ref(false);
    const selectedLetter = ref<SquareValue>("");
    const selectedCell = ref<{ row: number; col: number } | null>(null);
    const isCorrect = ref(false);

    onMounted(() => {
      initialBoard.value = board.value.map((row) => [...row]);
      window.addEventListener("keydown", handleKeyDown);
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      const letter = event.key.toUpperCase();
      if (["A", "B", "C", "D", "E", "F", "G", "H"].includes(letter)) {
        selectedLetter.value = letter as SquareValue;
      }
    };

    const handleLetterClick = (letter: SquareValue) => {
      if (isGameComplete.value) return;
      selectedLetter.value = letter;
    };

    const handleCellClick = (row: number, col: number) => {
      if (isGameComplete.value || !selectedLetter.value) return;
      if (initialBoard.value[row][col] === "") {
        board.value[row][col] = selectedLetter.value;
        selectedLetter.value = "";
        selectedCell.value = { row, col };
        checkGameComplete(board.value);
      }
    };

    const checkGameComplete = (currentBoard: SquareValue[][]) => {
      let isComplete = true;
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (currentBoard[row][col] === "") {
            isComplete = false;
            break;
          }
        }
        if (!isComplete) break;
      }
      isGameComplete.value = isComplete;
      if (isComplete) {
        checkSolution(currentBoard);
      } else {
        isCorrect.value = false;
      }
    };

    const isValidMove = (
      currentBoard: SquareValue[][],
      row: number,
      col: number,
      value: SquareValue
    ): boolean => {
      for (let i = 0; i < 8; i++) {
        if (i !== col && currentBoard[row][i] === value) return false;
        if (i !== row && currentBoard[i][col] === value) return false;
      }
      const diagonals = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ];
      for (const [dx, dy] of diagonals) {
        let x = row + dx;
        let y = col + dy;
        while (x >= 0 && x < 8 && y >= 0 && y < 8) {
          if ((x !== row || y !== col) && currentBoard[x][y] === value) {
            return false;
          }
          x += dx;
          y += dy;
        }
      }
      return true;
    };

    const checkSolution = (currentBoard: SquareValue[][]) => {
      let correct = true;
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (!isValidMove(currentBoard, row, col, currentBoard[row][col])) {
            correct = false;
            break;
          }
        }
        if (!correct) break;
      }
      isCorrect.value = correct;
    };

    const handleFinishGame = () => {
      if (!isGameComplete.value) {
        const isBoardComplete = board.value.every((row) =>
          row.every((cell) => cell !== "")
        );
        isGameComplete.value = isBoardComplete;
        if (isBoardComplete) {
          checkSolution(board.value);
        } else {
          isCorrect.value = false;
        }
      }
    };

    return {
      board,
      initialBoard,
      isGameComplete,
      selectedLetter,
      selectedCell,
      isCorrect,
      handleLetterClick,
      handleCellClick,
      handleFinishGame,
    };
  },
});
</script>

<style scoped>
.puzzle-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80vh;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.board {
  color: black;
  border-collapse: collapse;
  margin: 20px auto;
}

.board td {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  text-align: center;
  cursor: pointer;
}

.letters-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.letter-buttons button {
  background-color: transparent;
  color: white;
  border: none;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
}

.finish-button {
  background-color: #6e45e2;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  width: 100px;
  height: 50px;
  margin: 10px;
}
</style>
