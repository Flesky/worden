import { computed, reactive } from "vue";

export const statistics = reactive({
  wins: 0,
  losses: 0,
  streak: 0,
  maxStreak: 0,
  totalGames: computed(() => {
    return this.wins + this.losses;
  }),
});
