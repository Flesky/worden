<template>
  <div id="statistics">
    <h1>Statistics</h1>
    <hr class="mt-3" />
    <div class="grid grid-cols-4 mt-3 text-center">
      <StatisticsItem>
        <template #value>{{ statistics.gamesPlayed }}</template>
        <template #label>Played</template>
      </StatisticsItem>
      <StatisticsItem>
        <template #value>{{ winRate }}%</template>
        <template #label>Win rate</template>
      </StatisticsItem>
      <StatisticsItem>
        <template #value>{{ statistics.currentStreak }}</template>
        <template #label>Streak</template>
      </StatisticsItem>
      <StatisticsItem>
        <template #value>{{ statistics.maxStreak }}</template>
        <template #label>Max streak</template>
      </StatisticsItem>
    </div>
    <h1 class="mt-12">Guess distribution</h1>
    <hr class="mt-3" />
    <div class="mt-3">
      <div
        v-for="[guesses, number] in Object.entries(statistics.guesses)"
        :key="guesses"
        class="flex items-center mt-1 text-sm"
      >
        <div class="w-6 text-center">{{ guesses }}</div>
        <div
          class="rounded transition ml-2 pr-2 h-5 font-bold leading-5 text-right"
          :class="[
            game.status === 'WON' && guesses == game.guesses.length || game.status === null
              ? 'correct'
              : 'absent',
          ]"
          :style="{
            width:
              'calc(' +
              number +
              ' / ' +
              maxGuesses +
              ' * (100% - 3.5rem) + 1.5rem)',
          }"
        >
          {{ number }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticsItem from "./StatisticsItem.vue";
import { statistics } from "../../stores/statistics";
import { game } from "../../stores/game";

export default {
  name: "StatisticsComponent",
  components: { StatisticsItem },
  setup() {
    return {
      game,
      statistics,
    };
  },
  computed: {
    winRate() {
      return Math.round(
        (this.statistics.gamesWon / this.statistics.gamesPlayed) * 100
      );
    },
    maxGuesses() {
      return Math.max(...Object.values(this.statistics.guesses)) || 1;
    },
  },
};
</script>
