<template>
  <div class="mx-auto max-w-lg h-full overflow-hidden">
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
      <!--      <TestView v-else></TestView>-->
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

const toOrdinal = {
  1: "1st",
  2: "2nd",
  3: "3rd",
  4: "4th",
  5: "5th",
};

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
    // TestView
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
      this.initialize(gameId);
      this.view.pushToast("Playing custom word");
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
      this.game.initialize(gameId);
      this.guess = [];

      // SPREE
      // COVER
      // > RUDER

      // TREES
      // FORCE
      // MERGE
      // > LARGE

      // FORTE
      // MILLS
      // CUPID
      // CYNIC
      // > CHAIN

      // PARTY
      // TOPES
      // STEEP
      // > UPSET
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
        case 27: // escape
          this.view.setView();
          break;
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
      const guess = this.guess;
      const guesses = this.game.guesses;

      if (this.over && !this.view.name) {
        this.initialize();
      }
      if (guess.length === 0) return;
      if (guess.length < 5) {
        this.view.pushToast("Not enough letters");
        this.shake();
        return;
      }

      const guessString = guess.map((letter) => letter.letter).join("");

      if (!wordList.concat(wordPool).includes(guessString)) {
        this.shake();
        this.view.pushToast("Not in word list");
        // return;
        if (this.settings.hardMode) {
          for (let i = 4; i >= 0; --i) {
            this.guess[i].evaluation = "invalid";
          }
          guesses.push(guess)
          this.guess = []
        }
        return;
      }

      const secretWord = `${this.game.secretWord}`.split("");

      if (this.settings.hardMode) {
        let error = null;
        errorChecking: for (let checkGuess of guesses) {
          for (let i = 0; i < 5; ++i) {
            const checkLetter = checkGuess[i];
            const guessLetter = guessString[i];
            const ordinal = toOrdinal[i + 1];
            switch (checkLetter.evaluation) {
              case "correct":
                // CORRECT letters MUST be used where it is right
                if (checkLetter.letter !== guessLetter) {
                  error = `${ordinal} letter must be ${checkLetter.letter}`;
                }
                break;
              case "present":
                if (checkLetter.letter === guessLetter) {
                  error = `${ordinal} letter must not be ${guessLetter}`;
                }
                else if (!guessString.includes(checkLetter.letter)) {
                  error = `${checkLetter.letter} must be used`;
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
        if (guessString[i] === secretWord[i]) {
          guess[i].evaluation = "correct";
          secretWord.splice(i, 1);
        } else {
          correct = false;
        }
      }

      guess.forEach((letter) => {
        if (letter.evaluation) return;
        if (secretWord.includes(letter.letter)) {
          letter.evaluation = "present";
          secretWord.splice(secretWord.indexOf(letter.letter), 1);
        } else {
          letter.evaluation = "absent";
        }
      });

      this.keyboard.forEach((row) => {
        row.forEach((key) => {
          if (guess.some((letter) => letter.letter === key.letter)) {
            guess
              .filter((letter) => letter.letter === key.letter)
              .forEach((letter) => {
                if (key.evaluation === "correct") return;
                else if (
                  (key.evaluation === "present" &&
                    letter.evaluation === "correct") ||
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
