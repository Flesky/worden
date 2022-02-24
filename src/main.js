import { createApp } from "vue";
import App from "./App.vue";
import "./styles/index.css";

import { registerSW } from "virtual:pwa-register";
registerSW();
const app = createApp(App);

app.mount("#app");

// TODO: Make splash screen black
