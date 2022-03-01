<template>
  <TheHeader>
    <button
      aria-label="Info"
      @click="view.setView('help')"
      @keydown.esc="$event.target.blur()"
    >
      <IconInfo></IconInfo>
    </button>
    <TheLogo></TheLogo>
    <button
      aria-label="Settings"
      @click="view.setView('settings')"
      @keydown.esc="$event.target.blur()"
    >
      <IconCog></IconCog>
    </button>
  </TheHeader>

  <BaseMain>
    <BoardComponent :board="board" :shake="shakeRow"></BoardComponent>
    <KeyboardComponent
      :keyboard="keyboard"
      @handle-click="handleClick"
    ></KeyboardComponent>
  </BaseMain>

  <BaseToastComponent
    :toasts="view.toasts"
    @toast-expire="view.toasts.shift()"
  ></BaseToastComponent>

  <Transition name="slide-fade">
    <HelpView v-if="view.name === 'help'"></HelpView>
    <SettingsView
      v-else-if="view.name === 'settings'"
      @initialize="initialize"
    ></SettingsView>
    <ResultsView
      v-else-if="view.name === 'results'"
      @initialize="initialize"
    ></ResultsView>
  </Transition>
</template>

<script>
import { wordList, wordPool } from "./assets/words";
import IconInfo from "./components/icons/IconInfo.vue";
import IconCog from "./components/icons/IconCog.vue";
import TheLogo from "./components/TheLogo.vue";
import TheHeader from "./components/TheHeader.vue";
import { settings } from "./stores/settings";
import { game } from "./stores/game";
import { view } from "./stores/view";
import KeyboardComponent from "./components/game/keyboard/KeyboardComponent.vue";
import BoardComponent from "./components/game/board/BoardComponent.vue";
import BaseMain from "./components/BaseMain.vue";
import HelpView from "./views/HelpView.vue";
import SettingsView from "./views/SettingsView.vue";
import ResultsView from "./views/ResultsView.vue";
import BaseToastComponent from "./components/toast/BaseToastComponent.vue";
import { statistics } from "./stores/statistics";

String.prototype.replaceAt = function (replacement, index) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

export default {
  name: "GameView",
  components: {
    BaseToastComponent,
    ResultsView,
    SettingsView,
    HelpView,
    BoardComponent,
    TheHeader,
    IconInfo,
    IconCog,
    TheLogo,
    KeyboardComponent,
    BaseMain,
  },
  data() {
    return {
      guess: [],
      keyboard: [],

      shakeRow: null,

      screen: null,
      settings,
      view,
      game,
      statistics,
    };
  },
  computed: {
    fillGuess() {
      return Object.assign(new Array(5), this.guess);
    },
    board() {
      return Object.assign(
        new Array(6).fill(Array(5)),
        !this.game.status
          ? this.game.guesses.concat([this.fillGuess])
          : this.game.guesses
      );
    },
  },
  created() {
    window.addEventListener("keydown", this.handleKeydown);

    this.initializeKeyboard();
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search)
    );

    // If params, initialize param, override local
    // If not params, load local storage
    if (Object.keys(params).length) {
      if (params.word && params.word !== this.game.gameId) {
        const status = this.initialize(params.word);
        if (status) this.view.pushToast(status);
      }
      if (params.mode) {
        switch (params.mode) {
          case "hard":
            this.settings.hardMode = true;
            break;
        }
      } else {
        this.settings.hardMode = false;
      }
      history.replaceState(null, "", "/");
    }

    if (this.game.status || !this.game.secretWord) {
      this.initialize();
    } else {
      this.game.guesses.forEach((guess) => {
        this.updateKeyboard(
          guess,
          guess.map((letter) => letter.letter).join("")
        );
      });
    }

    if (!this.settings.onboarding) {
      this.view.setView("help");
      this.settings.onboarding = true;
    }
  },
  watch: {
    "settings.darkTheme": {
      handler(val) {
        document.documentElement.classList.toggle("dark", val);
      },
      immediate: true,
    },
    settings: {
      handler(val) {
        localStorage.setItem("settings", JSON.stringify(val));
      },
      deep: true,
    },
    game: {
      handler(val) {
        localStorage.setItem("game", JSON.stringify(val));
      },
      deep: true,
    },
    statistics: {
      handler(val) {
        localStorage.setItem("statistics", JSON.stringify(val));
      },
      deep: true,
    },
  },
  methods: {
    shake() {
      this.shakeRow = this.game.guesses.length;
      setTimeout(() => {
        this.shakeRow = null;
      }, 500);
    },

    initializeKeyboard() {
      this.keyboard = [];
      ["QWERTYUIOP", " ASDFGHJKL ", "→ZXCVBNM⌫"].forEach((row) => {
        this.keyboard.push(
          row
            .split("")
            .map((key) =>
              key !== key.toLowerCase()
                ? { letter: key }
                : key === " "
                ? { spacer: true }
                : { button: key }
            )
        );
      });
    },

    updateKeyboard(guess, guessString) {
      this.keyboard.forEach((row) => {
        row.forEach((key) => {
          if (guessString.includes(key.letter)) {
            guess
              .filter((letter) => letter.letter === key.letter)
              .forEach((letter) => {
                if (key.evaluation !== "correct") {
                  if (
                    letter.evaluation === "correct" ||
                    key.evaluation === undefined
                  ) {
                    key.evaluation = letter.evaluation;
                  }
                }
              });
          }
        });
      });
    },

    initialize(gameId) {
      this.view.setView();
      this.guess = [];
      this.initializeKeyboard();
      return this.game.initialize(gameId);
    },

    handleClick(key) {
      if (this.game.status) return this.view.setView("results");
      if (key.letter) this.type(key.letter);
      else if (key.button === "⌫") this.backspace();
      else if (key.button === "→") this.enter();
    },

    handleKeydown(key) {
      if (key.altKey || key.ctrlKey || key.shiftKey) return;
      key = key.keyCode;

      switch (key) {
        case 8:
          this.backspace();
          break;
        case 13:
          this.enter();
          break;
        // case 27: // escape
        case 32: // space
          if (this.game.status) this.initialize();
          else this.guess.push({ letter: " " });
          break;
        default:
          if (key >= 65 && key <= 90) this.type(String.fromCharCode(key));
          break;
      }
    },

    type(letter) {
      if (this.guess.length < 5 && !this.game.status)
        this.guess.push({ letter });
    },

    backspace() {
      if (!this.game.status) this.guess.pop();
    },

    enter() {
      const guess = this.guess;
      const { guesses, secretWord } = this.game;

      if (guess.length === 0) return;

      const guessString = guess.map((letter) => letter.letter).join("");
      if (guesses.length === 0) {
        const playtesters = [
          "JIWON",
          "KISH",
          "KYO",
          "TUMBS",
          "GELA",
          "ZED",
          "KENN",
          "EMMAN",
          "YANNA",
          "KAT",
          "CHANZ",
          "CHAI",
          "DAVID",
          "ASIA",
        ];
        if (playtesters.includes(guessString)) {
          this.view.pushToast("Thanks for playtesting the game!");
          this.guess = [];
          return;
        }
      }

      if (guessString.includes(" ")) {
        this.view.pushToast("Can't include blanks");
        this.shake();
        return;
      }
      if (guess.length < 5) {
        this.view.pushToast("Not enough letters");
        this.shake();
        return;
      }

      const { hardMode } = this.settings;
      if (!wordList.concat(wordPool).includes(guessString)) {
        this.shake();
        this.view.pushToast("Not in word list");
        if (hardMode) {
          for (let i = 4; i >= 0; --i) {
            this.guess[i].evaluation = "invalid";
          }
          guesses.push(guess);
          this.guess = [];

          console.log("Hello")
          if (guesses.length > 5) {
            this.game.status = "LOSS";
          }
          if (this.game.status) {
            this.statistics.addGame(this.game);
            this.view.setView("results");
          }
        }
        return;
      }

      const secretWordString = `${secretWord}`.split("");
      if (hardMode) {
        let error = null;
        errorChecking: for (let checkGuess of guesses) {
          for (let i = 0; i < 5; ++i) {
            const ordinal = {
              1: "1st",
              2: "2nd",
              3: "3rd",
              4: "4th",
              5: "5th",
            }[i + 1];
            switch (checkGuess[i].evaluation) {
              case "correct":
                if (checkGuess[i].letter !== guessString[i]) {
                  error = `${ordinal} letter must be ${checkGuess[i].letter}`;
                }
                break;
              case "present":
                if (checkGuess[i].letter === guessString[i]) {
                  error = `${ordinal} letter must not be ${guessString[i]}`;
                } else if (!guessString.includes(checkGuess[i].letter)) {
                  error = `${checkGuess[i].letter} must be used`;
                }
                break;
            }
            if (error) break errorChecking;
          }
        }
        if (error) {
          this.view.pushToast(error);
          this.shake();
          return;
        }
      }

      let correct = true;
      for (let i = 4; i >= 0; --i) {
        if (guessString[i] === secretWordString[i]) {
          guess[i].evaluation = "correct";
          secretWordString.splice(i, 1);
        } else {
          correct = false;
        }
      }

      guess.forEach((letter) => {
        if (letter.evaluation) return;
        if (secretWordString.includes(letter.letter)) {
          letter.evaluation = "present";
          secretWordString.splice(secretWordString.indexOf(letter.letter), 1);
        } else {
          letter.evaluation = "absent";
        }
      });

      this.updateKeyboard(guess, guessString);

      guesses.push(guess);
      this.guess = [];

      if (correct) {
        this.game.status = "WON";
      } else if (guesses.length > 5) {
        this.game.status = "LOSS";
      }
      if (this.game.status) {
        this.statistics.addGame(this.game);
        this.view.setView("results");
      }
    },
  },
};
</script>

<style></style>
