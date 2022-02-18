<template>
  <BaseDialog>
    <template v-if="game.won">
      <h1>{{ praise }}</h1>
      <p class="mt-3">
        You got {{ game.secretWord }} in {{ game.guesses.length }}
        {{ game.guesses.length === 1 ? "try" : "tries" }}.
      </p>
    </template>
    <template v-else>
      <h1>Better luck next time!</h1>
      <p class="mt-3">The word was {{ game.secretWord }}.</p>
    </template>

    <h2 class="mt-12">Share this word</h2>
    <p class="mt-3">Send this link to a friend for them to play this word.</p>
    <button
      class="bg-green text-white text-sm rounded px-3 py-2 mt-3"
      @click.prevent="copyToClipboard"
    >
      Share
    </button>
    <div>
      <button
        class="bg-green text-white text-sm rounded px-3 py-2 mt-12"
        @click.prevent="$emit('initialize')"
      >
        Play again
      </button></div>
  </BaseDialog>
</template>

<script>
import { game } from "../stores/game";
import { praisePool } from "../assets/words";

import BaseDialog from "../components/BaseDialog.vue";
import { view } from "../stores/view";
export default {
  name: "ResultsView",
  components: { BaseDialog },
  data() {
    return {
      praise: null,
      emojis: null,
      copied: false,
      game,
      view,
    };
  },
  created() {
    if (this.game.won)
      this.praise = praisePool[Math.floor(Math.random() * praisePool.length)];
    // if (this.game.guesses) {}
    this.emojis = this.game.guesses
      .map((guess) =>
        guess
          .map(
            (letter) =>
              ({ correct: "🟩", present: "🟨", absent: "⬛" }[
                letter.evaluation
              ])
          )
          .join("")
      )
      .join("\n");
  },
  methods: {
    async copyToClipboard() {
      this.view.pushToast("Copied to clipboard");
      navigator.clipboard
        .writeText(
          `Worden | Unlimited Wordle ${
            this.game.won ? this.game.guesses.length : "X"
          }/6

${this.emojis}

Think you can do better? Play the same word here:
https://worden.web.app/?word=${this.game.gameId}`
        )
        .then(() => (this.copied = true));
    },
  },
  emits: ["initialize"],
};
</script>
