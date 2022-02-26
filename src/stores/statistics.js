import { reactive } from "vue";

export const statistics = reactive({
  ...(JSON.parse(localStorage.getItem("statistics")) || {
    guesses: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    },
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
  }),

  addGame(game) {
    this.gamesPlayed++;
    switch (game.status) {
      case "WON":
        this.guesses[game.guesses.length] =
          this.guesses[game.guesses.length] + 1;
        this.gamesWon++;
        this.currentStreak++;
        if (this.currentStreak > this.maxStreak) {
          this.maxStreak = this.currentStreak;
        }
        break;
      case "LOSS":
        this.currentStreak = 0;
        break;
    }
  },
  // addGuess(guess) {
  //   this.guesses = this.guesses[guess] + 1;
  // },
});
