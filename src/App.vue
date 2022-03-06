<template>
  <TheHeader>
    <IconButton path="help">
      <IconInfo />
    </IconButton>
<!--    <IconButton path="share"> <IconShare /></IconButton>-->
    <TheLogo />
<!--    <IconButton path="statistics"><IconChart /></IconButton>-->
    <IconButton path="settings"> <IconCog /></IconButton>
  </TheHeader>

  <main id="game" class="flex flex-col h-[calc(100%_-_3.5rem)] pb-2">
    <BoardComponent :board="board" :shake="shakeRow" />
    <KeyboardComponent :keyboard="keyboard" @handle-click="handleClick" />
  </main>

  <Teleport to="body">
    <BaseToastComponent
      :toasts="view.toasts"
      @toast-expire="view.toasts.shift()"
    />

    <Transition name="slide-fade">
      <HelpView v-if="view.name === 'help'" />
<!--      <ShareView v-else-if="view.name === 'share'"-->
<!--      @initialize="initializeGame"/>-->
<!--      <StatisticsView v-else-if="view.name === 'statistics'" />-->
      <SettingsView v-else-if="view.name === 'settings'" />
      <ResultsView
        v-else-if="view.name === 'results'"
        @initialize="initializeGame"
      />
    </Transition>
  </Teleport>
</template>

<script>
import { wordList, wordPool } from "./assets/words";
import TheHeader from "./components/TheHeader.vue";
import TheLogo from "./components/TheLogo.vue";
import IconButton from "./components/IconButton.vue";
import IconInfo from "./components/icons/IconInfo.vue";
// import IconShare from "./components/icons/IconShare.vue";
// import IconChart from "./components/icons/IconChart.vue";
import IconCog from "./components/icons/IconCog.vue";
import { settings } from "./stores/settings";
import { game } from "./stores/game";
import { view } from "./stores/view";
import { statistics } from "./stores/statistics";
import KeyboardComponent from "./components/game/keyboard/KeyboardComponent.vue";
import BoardComponent from "./components/game/board/BoardComponent.vue";
import HelpView from "./views/HelpView.vue";
// import ShareView from "./views/ShareView.vue";
// import StatisticsView from "./views/StatisticsView.vue";
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
    IconButton,
    IconInfo,
    // IconShare,
    IconCog,
    // IconChart,
    TheHeader,
    TheLogo,
    KeyboardComponent,
    BoardComponent,
    HelpView,
    // StatisticsView,
    // ShareView,
    SettingsView,
    ResultsView,
    BaseToastComponent,
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
      if (params.word) {
        let status;
        if (params.mode && params.mode === "hard") {
          status = this.initializeGame(params.word, true);
        } else {
          status = this.initializeGame(params.word, false);
        }
        if (status) this.view.pushToast(status);
      }
      history.replaceState(null, "", "/");
    }

    if (this.game.status || !this.game.secretWord) {
      this.initializeGame();
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

    initializeGame(gameId, hardMode = settings.hardMode) {
      this.view.setView();
      this.guess = [];
      this.initializeKeyboard();
      return this.game.initialize(gameId, hardMode);
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
          if (document.activeElement === document.body) {
            this.enter();
          }
          break;
        case 27: // escape
          this.view.setView();
          break;
        case 32: // space
          if (document.activeElement === document.body) {
            if (this.game.status) this.initializeGame();
            else if (!this.view.name) {
              this.guess.push({ letter: " " });
            }
          }
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
      const { guesses, secretWord, hardMode } = this.game;

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
          "JOMA",
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

      if (!wordList.concat(wordPool).includes(guessString)) {
        this.shake();
        this.view.pushToast("Not in word list");
        if (hardMode) {
          for (let i = 4; i >= 0; --i) {
            this.guess[i].evaluation = "invalid";
          }
          guesses.push(guess);
          this.guess = [];

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
