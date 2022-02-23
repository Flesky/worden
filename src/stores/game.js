import { reactive } from "vue";
import { wordList, wordPool } from "../assets/words";
import { settings } from "./settings";

export const game = reactive({
  secretWord: null,
  gameId: null,
  guesses: [],
  won: false,
  initialize(gameId) {
    let status = null;
    this.secretWord = null;
    try {
      if (gameId) {
        if (wordPool.concat(wordList).includes(atob(gameId))) {
          this.secretWord = atob(gameId);
          this.gameId = gameId;
          status = "Playing custom word";
        } else status = "Invalid link, playing random word";
      }
    } catch (DOMException) {
      status = "Invalid link, playing random word";
    } finally {
      if (!this.secretWord) {
        let pool = wordPool;
        if (settings.expandedMode) {
          pool = pool.concat(wordList);
        }
        this.secretWord = pool[Math.floor(Math.random() * pool.length)];
        this.gameId = btoa(this.secretWord);
        this.gameId = this.gameId.slice(0, this.gameId.indexOf("="));
      }
    }
    this.guesses = [];
    this.won = false;
    return status;
  },
});
