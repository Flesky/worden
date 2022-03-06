<template>
  <BaseDialog>
    <div id="results">
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

      <StatisticsComponent class="mt-8" />

      <div class="flex flex-col mt-12">
        <button
          class="px-3 py-2 text-sm rounded correct grow"
          @click.prevent="$emit('initialize')"
        >
          Play again
        </button>
        <button
          class="px-3 py-2 mt-2 text-sm rounded present"
          @click.prevent="copyToClipboard"
        >
          Share
        </button>
      </div>
    </div>
  </BaseDialog>
</template>

<script>
import { game } from "../stores/game";
import { settings } from "../stores/settings";
import { praisePool } from "../assets/words";

import BaseDialog from "../components/BaseDialog.vue";
import { view } from "../stores/view";
import { statistics } from "../stores/statistics";
import StatisticsComponent from "../components/statistics/StatisticsComponent.vue";

export default {
  name: "ResultsView",
  components: { StatisticsComponent, BaseDialog },
  data() {
    return {
      praise: null,
      emojis: null,
      URL: null,
    };
  },
  setup() {
    return {
      game,
      settings,
      statistics,
      view,
    };
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
      if (this.game.hardMode) {
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
