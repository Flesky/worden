<template>
  <section
    class="overflow-auto fixed top-0 left-0 z-10 w-full h-full backdrop-blur-sm transition bg-white/90 dark:bg-black/90"
  >
    <div class="relative mx-auto max-w-lg h-full">
      <button @click="view.setView()" class="absolute top-4 right-4">
        <IconClose class="dark:fill-white"></IconClose>
      </button>
      <div class="px-4 pt-12 pb-4">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
import IconClose from "./icons/IconClose.vue";
import { view } from "../stores/view.js";

export default {
  components: { IconClose },
  data() {
    return {
      view,
    };
  },
  emits: ["closeDialog"],
};
</script>
