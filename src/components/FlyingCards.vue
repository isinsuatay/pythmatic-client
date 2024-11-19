<template>
  <div class="flying-cards-container">
    <div ref="stackArea" class="cards-area">
      <div class="side-container">
        <div class="title">Welcome to PythMatic!</div>
        <div class="subtitle">
          PythMatic is a gateway for anyone eager to explore the exciting world
          of mathematics and algorithms. This platform offers a range of
          features, including a live Python Compiler, a scientific calculator,
          and various levels of algorithms and math problems. PythMatic
          encourages practice, enabling users to master math and enhance their
          programming skills. Take a step into the realms of math and coding
          with PythMatic and start your exploration today!
        </div>
      </div>
      <div class="cards-container">
        <div class="side-container">
          <div
            v-for="(style, index) in cardStyles"
            :key="index"
            class="card"
            :class="{ active: isActive[index] }"
            :style="{ zIndex: 4 - index, background: style }"
          >
            <h2>{{ getCardTitle(index) }}</h2>
            <p>{{ getCardDescription(index) }}</p>
            <router-link :to="getCardLink(index)" class="cards-btn">
              {{ getCardButtonText(index) }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";

export default defineComponent({
  setup() {
    const stackArea = ref<HTMLElement | null>(null);
    const cards = ref<NodeListOf<HTMLElement> | null>(null);
    const cardStyles = ref([
      "linear-gradient(100deg, #e36414, #800200, #5f0f40, #0f4c5c)",
      "linear-gradient(100deg, #364649, #708f96, #aa895f, #e0d8cc)",
      "linear-gradient(100deg, #bab0d4, #5f0f40, #00a8aa)",
      "linear-gradient(100deg, #6868ac, #119da4, #fde789)",
    ]);
    const isActive = ref<boolean[]>([false, false, false, false]);

    const getCardTitle = (index: number) => {
      switch (index) {
        case 0:
          return "Different Algorithms and Math Problems";
        case 1:
          return "Live Python Compiler";
        case 2:
          return "Scientific Calculator";
        case 3:
          return "Opportunity for Practice";
        default:
          return "";
      }
    };

    const getCardDescription = (index: number) => {
      switch (index) {
        case 0:
          return "A variety of difficulty levels for algorithms and math problems. Improve your skills and learn new concepts through practice.";
        case 1:
          return "A live coding environment to enhance your Python skills. Start typing right away and see instant results.";
        case 2:
          return "Easily perform complex mathematical operations. Master mathematics with graphical and numerical computation capabilities.";
        case 3:
          return "Practice with real-life examples to strengthen your skills. Test yourself in algorithm and math domains with Python.";
        default:
          return "";
      }
    };

    const getCardLink = (index: number) => {
      switch (index) {
        case 0:
          return "/questions";
        case 1:
          return "/compiler";
        case 2:
          return "/";
        case 3:
          return "/games";
        default:
          return "";
      }
    };

    const getCardButtonText = (index: number) => {
      switch (index) {
        case 0:
          return "Questions";
        case 1:
          return "Compiler";
        case 2:
          return "Calculator";
        case 3:
          return "Games";
        default:
          return "";
      }
    };

    const rotateCards = () => {
      let angle = 0;
      cards.value?.forEach((card, index) => {
        if (isActive.value[index]) {
          card.style.transform = "translate(-50%, -120vh) rotate(-48deg)";
        } else {
          card.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
          angle -= 10;
        }
      });
    };

    const handleScroll = () => {
      if (!stackArea.value || !cards.value) return;

      const proportion =
        stackArea.value.getBoundingClientRect().top / window.innerHeight;
      if (proportion <= 0) {
        const n = cards.value.length;
        const index = Math.ceil((proportion * n) / 2);
        const newIndex = Math.abs(index) - 1;
        for (let i = 0; i < n; i++) {
          isActive.value[i] = i <= newIndex;
        }
        rotateCards();
      }
    };

    onMounted(() => {
      cards.value = document.querySelectorAll(".card");
      handleScroll();
      window.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      stackArea,
      cardStyles,
      isActive,
      getCardTitle,
      getCardDescription,
      getCardLink,
      getCardButtonText,
    };
  },
});
</script>

<style scoped>
.flying-cards-container {
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cards-area {
  width: 100%;
  height: 300vh;
  position: relative;
  display: flex;
  justify-content: center;
}

.side-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  box-sizing: border-box;
  flex-direction: column;
  padding: 100px;
}

.cards-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  width: 350px;
  height: 350px;
  box-sizing: border-box;
  padding: 50px;
  border-radius: 20%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.5s ease-in-out;
}

.card.active {
  transform: translate(-50%, -120vh) rotate(-48deg);
  transform-origin: bottom left;
}

.title {
  width: 420px;
  font-size: 5rem;
  font-family: poppins;
  font-weight: 700;
  line-height: 88px;
}

.subtitle {
  width: 420px;
  font-family: poppins;
  font-size: 14px;
  margin-top: 30px;
  text-align: center;
}

.cards-btn {
  background-color: transparent;
}

@media (max-width: 768px) {
  .card {
    width: 350px;
    height: 350px;
  }

  .cards-area {
    display: flex;
    flex-direction: column;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 0, 0, 1),
      brown
    );
  }
}
</style>
