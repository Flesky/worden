import { reactive } from "vue";
import { wordList, wordPool } from "../assets/words";
import { settings } from "./settings";

export const game = reactive({
  secretWord: null,
  gameId: null,
  guesses: [],
  won: false,
  initialize(gameId) {
    this.secretWord = null;
    if (gameId) {
      try {
        if (wordPool.concat(wordList).includes(atob(gameId))) {
          this.secretWord = atob(gameId);
          this.gameId = gameId;
        }
        // eslint-disable-next-line no-empty
      } catch (DOMException) {
      } finally {
      }
    }

    if (!this.secretWord) {
      let pool = wordPool;
      if (settings.expandedMode) {
        pool = pool.concat(wordList);
      }
      this.secretWord = pool[Math.floor(Math.random() * pool.length)];
      this.gameId = btoa(this.secretWord);
      this.gameId = this.gameId.slice(0, this.gameId.indexOf("="));
    }

    this.guesses = [];
    this.won = false;
  },
});

// export const useGameStore = reactive({
//   id: "game",
//   state: () => ({
//     secretWord: null,
//     gameId: null,
//     guesses: [],
//
//     won: false,
//   }),
//   getters: {
//     over: (state) => {
//       return state.guesses.length > 5 || state.won;
//     },
//   },
//   actions: {},
// });
