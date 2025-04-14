<template>
  <div>
    <button class="toggle-button" @click="toggleSidebar">☰</button>
    <div class="sidebar" :class="{ active: isActive }">
      <button class="sidebar-close-button" @click="toggleSidebar">✖</button>
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
