<template>
  <div class="mx-auto max-w-lg h-full overflow-x-hidden">
    <TheHeader>
      <button @click="view.setView('help')" @keydown.esc="$event.target.blur()">
        <IconInfo></IconInfo>
      </button>
      <TheLogo></TheLogo>
      <button
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
  </div>
</template>

<script>
import { wordList, wordPool } from "@/assets/words";
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
    };
  },
  computed: {
    fillGuess() {
      return Object.assign(new Array(5), this.guess);
    },
    board() {
      return Object.assign(
        new Array(6).fill(Array(5)),
        !this.over
          ? this.game.guesses.concat([this.fillGuess])
          : this.game.guesses
      );
    },
    over() {
      return this.game.guesses.length > 5 || this.game.won;
    },
  },
  created() {
    window.addEventListener("keydown", this.handleKeydown);

    const gameId = new URLSearchParams(window.location.search).get("word");
    if (gameId) {
      const status = this.initialize(gameId);
      if (status) this.view.pushToast(status);
      history.replaceState(null, "", "/");
    } else {
      this.initialize();
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
  },
  methods: {
    shake() {
      this.shakeRow = this.game.guesses.length;
      setTimeout(() => {
        this.shakeRow = null;
      }, 500);
    },
    initialize(gameId) {
      this.view.setView();
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
      this.guess = [];
      return this.game.initialize(gameId);
    },
    handleClick(key) {
      if (key.letter) this.type(key.letter);
      else if (key.button === "⌫") this.backspace();
      else if (key.button === "→") this.enter();
    },
    handleKeydown(key) {
      if (key.altKey || key.ctrlKey || key.shiftKey) return;
      key = key.keyCode;

      switch (key) {
        case 8: // backspace
          this.backspace();
          break;
        case 13: // enter
          this.enter();
          break;
        // case 27: // escape
        //   this.view.setView();
        //   break;
        case 32: // space
          break;
        default:
          if (key >= 65 && key <= 90) this.type(String.fromCharCode(key));
          break;
      }
    },
    type(letter) {
      if (this.guess.length < 5 && !this.over) this.guess.push({ letter });
    },
    backspace() {
      if (!this.over) this.guess.pop();
    },
    enter() {
      if (this.over) return this.initialize();

      const guess = this.guess;
      const guesses = this.game.guesses;

      if (guess.length === 0) return;

      const guessString = guess.map((letter) => letter.letter).join("");
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
        "DAVID",
        "ASIA",
      ];
      if (playtesters.includes(guessString)) {
        this.view.pushToast("Thanks for playtesting the game!");
        this.guess = [];
        return;
      }

      if (guess.length < 5) {
        this.view.pushToast("Not enough letters");
        this.shake();
        return;
      }

      if (!wordList.concat(wordPool).includes(guessString)) {
        this.shake();
        this.view.pushToast("Not in word list");
        if (this.settings.hardMode) {
          for (let i = 4; i >= 0; --i) {
            this.guess[i].evaluation = "invalid";
          }
          guesses.push(guess);
          this.guess = [];
        }
        return;
      }

      const secretWordString = `${this.game.secretWord}`.split("");
      if (this.settings.hardMode) {
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

      this.keyboard.forEach((row) => {
        row.forEach((key) => {
          if (guessString.includes(key.letter)) {
            guess
              .filter((letter) => letter.letter === key.letter)
              .forEach((letter) => {
                if (key.evaluation === "correct") return;
                else if (
                  letter.evaluation === "correct" ||
                  key.evaluation === undefined
                ) {
                  key.evaluation = letter.evaluation;
                }
              });
          }
        });
      });

      if (correct) {
        this.game.won = true;
      }

      guesses.push(guess);
      if (this.game.won || guesses.length === 6) {
        this.view.setView("results");
      }

      this.guess = [];
    },
  },
};
</script>

<style></style>
