import { reactive } from "vue";

export const settings = reactive({
  ...(JSON.parse(localStorage.getItem("settings")) || {
    darkTheme: false,
    hardMode: false,
    expandedMode: false,
  }),
  toggleDarkTheme() {
    this.darkTheme = !this.darkTheme;
  },
  toggleHardMode() {
    this.hardMode = !this.hardMode;
  },
  toggleExpandedMode() {
    this.expandedMode = !this.expandedMode;
  },
});
