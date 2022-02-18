<template>
  <!--  <TransitionGroup tag="div" name="fade" class="flex items-center space-x-1 transition">-->
  <div class="flex items-center space-x-1">
    <div
      class="text-xl leading-none font-display text-light sm:text-2xl dark:text-white"
    >
      worden
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
