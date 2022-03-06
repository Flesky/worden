<template>
  <div class="flex items-center justify-center space-x-1 grow">
    <div
      class="text-2xl tracking-tight leading-none font-display text-light dark:text-white"
    >
      Worden
    </div>
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

export default {
  data() {
    return {
      game,
    };
  },
};
</script>
