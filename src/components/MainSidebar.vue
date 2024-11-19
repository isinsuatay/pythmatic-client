<template>
  <div>
    <button class="toggle-button" @click="toggleSidebar">☰</button>
    <div class="sidebar" :class="{ active: isActive }">
      <button class="close-button" @click="toggleSidebar">✖</button>
      <ul
        class="menu-hover-fill flex flex-col items-start leading-none text-2xl uppercase space-y-4"
      >
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          :style="getStyle(index)"
        >
          <a :href="item.link" :data-text="item.text">{{ item.text }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { text: "HOME", link: "/" },
        { text: "QUESTIONS", link: "/questions" },
        { text: "GAMES", link: "/games" },
        { text: "COMPILER", link: "/compiler" },
      ],
      isActive: false, // Track if the sidebar is active
    };
  },
  methods: {
    toggleSidebar() {
      this.isActive = !this.isActive; // Toggle sidebar visibility
    },
    getStyle(index) {
      const colors = [
        "var(--primary-color)",
        "var(--info-color)",
        "var(--success-color)",
        "var(--warning-color)",
        "var(--danger-color)",
      ];
      return {
        "--menu-link-active-color": colors[index % colors.length],
      };
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100%;
  padding: 2rem;
  z-index: 9999;
  position: fixed;
  left: 0;
  top: calc(100vh / 4);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.sidebar.active {
  transform: translateX(0); /* Show when active */
}

.toggle-button {
  display: none;
  font-size: 2rem;
  position: fixed;
  top: 1rem;
  left: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10000;
}

.close-button {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10001;
  color: #00bcd4;
}

@media (min-width: 769px) {
  .close-button {
    display: none;
  }
}

ul {
  padding: 0;
  margin: 20px;
  list-style-type: none;
}

.menu-hover-fill li {
  position: relative;
  padding: 20px;
}

.menu-hover-fill li::before {
  position: absolute;
  content: "";
  top: 0;
  left: -1rem;
  width: 0.25rem;
  height: 100%;
  background: #ff9800;
  transition: 0.6s;
}

.menu-hover-fill li a {
  position: relative;
  color: #ff9800;
  font-weight: 900;
  background-clip: text;
  -webkit-background-clip: text;
  transition: background-size 0.45s 0.04s;
}

.menu-hover-fill li:hover::before {
  left: calc(100% + 1rem);
}

.menu-hover-fill li:hover a {
  background-size: 100%;
}

/* Media query for mobile screens */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: 100vh;
    top: 0;
    position: fixed;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: background-color 0.5s ease;
    z-index: 10;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 0, 0, 1),
      brown
    );
  }

  .sidebar.active {
    transform: translateX(0);
  }

  .sidebar ul li {
    height: 10vh;
    top: calc(100vh / 4);
  }

  .toggle-button {
    display: block;
  }
}

/* Ensure sidebar is always visible on larger screens */
@media (min-width: 769px) {
  .sidebar {
    transform: translateX(0);
  }

  .toggle-button {
    display: none;
  }
}
</style>
