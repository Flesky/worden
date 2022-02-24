import { reactive } from "vue";

// const unwrap = ({ darkTheme, onboarding }) => ({ darkTheme, onboarding });

export const settings = reactive({
  ...(JSON.parse(localStorage.getItem("settings")) || {
    darkTheme: false,
    onboarding: false,
    hardMode: false,
    expandedMode: false,
  }),
});
