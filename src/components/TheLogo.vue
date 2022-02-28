<template>
  <!--  <TransitionGroup tag="div" name="fade" class="flex items-center space-x-1 transition">-->
  <div class="flex items-center space-x-1">
    <div
      class="text-2xl tracking-tighter leading-none font-display text-light dark:text-white"
    >
      Worden
    </div>
    <div
      v-if="settings.hardMode"
      class="text-xs bg-red text-white leading-none py-1 px-1.5 rounded"
    >
      HARD MODE
    </div>
  </div>
  <!--  </TransitionGroup-->
  <!--  >-->
</template>

<script>
import { settings } from "../stores/settings";

export default {
  data() {
    return {
      settings,
    };
  },
};
</script>
