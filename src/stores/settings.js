import { reactive } from "vue";

import { game } from "./game";
import { view } from "./view";

export const settings = reactive({
  ...(JSON.parse(localStorage.getItem("settings")) || {
    darkTheme: false,
    onboarding: false,
    hardMode: false,
    expandedMode: false,
  }),

  toggleHardMode() {
    const { guesses, gameId } = game;
    this.hardMode = !this.hardMode;
    if (guesses.length) {
      view.pushToast("Setting will be applied next game");
    } else {
      if (this.hardMode) {
        view.pushToast("Playing on hard mode");
      } else {
        view.pushToast("Playing on normal mode");
      }
      game.initialize(gameId);
    }
  },

  toggleExpandedMode() {
    const { guesses } = game;
    if (guesses.length) {
      view.pushToast("Setting will be applied next game");
    } else {
      if (this.expandedMode) {
        view.pushToast("Playing on extended mode");
      } else {
        view.pushToast("Playing on normal mode");
      }
      game.initialize();
    }
  },
});
