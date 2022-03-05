<template>
  <BaseDialog close>
    <template v-if="game.status === 'WON'">
      <h1>{{ praise }}</h1>
      <p class="mt-3">
        You got <span class="font-bold">{{ game.secretWord }}</span> in
        {{ game.guesses.length }}
        {{ game.guesses.length === 1 ? "try" : "tries" }}.
      </p>
    </template>
    <template v-else>
      <h1 ref="heading" tabindex="-1">Better luck next time!</h1>
      <p class="mt-3">
        The word was <span class="font-bold">{{ game.secretWord }}</span
        >.
      </p>
    </template>

    <h1 class="mt-12">Statistics</h1>
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
            game.status === 'WON' && guesses == game.guesses.length
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

    <h1 class="mt-12">Share this word</h1>
    <hr class="mt-3" />
    <p class="mt-3">Send this to a friend for them to play this word.</p>
    <button
      class="px-3 py-2 mt-3 text-sm text-white rounded bg-green"
      @click.prevent="copyToClipboard"
    >
      Share
    </button>
    <div>
      <button
        class="px-3 py-2 mt-12 text-sm text-white rounded bg-green"
        @click.prevent="$emit('initialize')"
      >
        Play again
      </button>
    </div>
  </BaseDialog>
</template>

<script>
// Worden Daily | Wordle 243 X/6
// Worden Endless
// Worden Hard Mode X/6

import { game } from "../stores/game";
import { settings } from "../stores/settings";
import { praisePool } from "../assets/words";

import BaseDialog from "../components/BaseDialog.vue";
import { view } from "../stores/view";
import { statistics } from "../stores/statistics";
import StatisticsItem from "../components/results/StatisticsItem.vue";

export default {
  name: "ResultsView",
  components: { StatisticsItem, BaseDialog },
  data() {
    return {
      praise: null,
      emojis: null,
      URL: null,
      game,
      settings,
      statistics,
      view,
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
  created() {
    if (this.game.status === "WON") {
      this.praise = praisePool[Math.floor(Math.random() * praisePool.length)];
    }
    this.emojis = this.game.guesses
      .map((guess) =>
        guess
          .map(
            (letter) =>
              ({ correct: "🟩", present: "🟨", absent: "⬛", invalid: "🟥" }[
                letter.evaluation
              ])
          )
          .join("")
      )
      .join("\n");
  },
  methods: {
    getURL() {
      let params = new URLSearchParams();
      params.append("word", this.game.gameId);
      if (this.settings.hardMode) {
        params.append("mode", "hard");
      }
      return "https://worden.web.app/?" + params.toString();
    },
    async copyToClipboard() {
      this.view.pushToast("Copied to clipboard");
      navigator.clipboard
        .writeText(
          `Worden | Unlimited Wordle ${
            this.game.status === "WON" ? this.game.guesses.length : "X"
          }/6

${this.emojis}

Think you can do better? Play the same word here:
${this.getURL()}`
        )
        .then(() => (this.copied = true));
    },
  },
  emits: ["initialize"],
};
</script>
