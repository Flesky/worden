<template>
  <div class="flex items-center justify-center space-x-1 grow">
    <button
      class="text-2xl tracking-tight leading-none font-display text-light dark:text-white"
      @click="view.setView('about')"
    >
      Worden
    </button>
    <div
      v-if="game.hardMode"
      class="text-xs bg-red text-white leading-none py-1 px-1.5 rounded"
    >
      HARD MODE
    </div>
  </div>
</template>

<script>
import { game } from "../stores/game";
import { view } from "../stores/view";

export default {
  setup() {
    return {
      game,
      view,
    };
  },
};
</script>
