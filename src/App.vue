<template>
  <div class="mx-auto max-w-lg h-full">
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
      <BoardComponent :board="board"></BoardComponent>
      <KeyboardComponent
        :keyboard="keyboard"
        @handle-click="handleClick"
      ></KeyboardComponent>
    </BaseMain>

    <ToastComponent :toasts="view.toasts"
    @toast-expire="view.toasts.shift()"></ToastComponent>

    <Transition name="slide-fade">
      <HelpView v-if="view.name === 'help'"></HelpView>
      <SettingsView v-else-if="view.name === 'settings'"></SettingsView>
      <ResultsView v-else-if="view.name === 'results'"></ResultsView>
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
import KeyboardComponent from "./components/game/KeyboardComponent.vue";
import BoardComponent from "./components/game/BoardComponent.vue";
import BaseMain from "./components/BaseMain.vue";
import HelpView from "./views/HelpView.vue";
import SettingsView from "./views/SettingsView.vue";
import ResultsView from "./views/ResultsView.vue";
import ToastComponent from "./components/ToastComponent.vue";

export default {
  name: "GameView",
  components: {
    ToastComponent,
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
  // unmounted() {
  //   window.removeEventListener("keydown", this.handleKeydown);
  // },
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
    initialize(gameId) {
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
      if (this.over && !this.view.name) {
        this.initialize();
      }
      if (this.guess.length === 0) return;
      if (this.guess.length < 5)
        return this.view.pushToast("Too short of a word");
      if (
        !wordList
          .concat(wordPool)
          .includes(this.guess.map((letter) => letter.letter).join(""))
      )
        return this.view.pushToast("Not in word list");

      const secretWord = `${this.game.secretWord}`.split("");

      let correct = true;
      for (let i = 4; i >= 0; --i) {
        if (this.guess[i].letter === secretWord[i]) {
          this.guess[i].evaluation = "correct";
          secretWord.splice(i, 1);
        } else {
          correct = false;
        }
      }

      this.guess.forEach((letter) => {
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
          if (this.guess.some((letter) => letter.letter === key.letter)) {
            this.guess
              .filter((letter) => letter.letter === key.letter)
              .forEach((letter) => {
                if (key.evaluation === "correct" || key.evaluation === "absent")
                  return;
                if (
                  (key.evaluation === " present" &&
                    letter.evaluation === "correct") ||
                  key.evaluation === undefined
                )
                  key.evaluation = letter.evaluation;
              });
          }
        });
      });

      if (correct) {
        this.game.won = true;
      }

      this.game.guesses.push(this.guess);
      if (this.game.won || this.game.guesses.length === 6) {
        this.view.setView("results");
      }

      this.guess = [];
    },
  },
};
</script>

<style></style>
