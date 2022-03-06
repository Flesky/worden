<template>
  <div
    ref="dialog"
    role="dialog"
    id="dialog"
    class="overflow-y-auto fixed top-0 left-0 z-10 w-full h-full backdrop-blur-sm transition bg-white/90 dark:bg-black/90"
  >
    <div class="relative mx-auto max-w-lg h-full">
      <button
        aria-label="Close"
        @keyup.esc="view.setView()"
        @click="view.setView()"
        class="absolute top-4 right-4"
      >
        <IconClose class="dark:fill-white"></IconClose>
      </button>
      <div class="px-4 pt-12 pb-4 grow">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import IconClose from "./icons/IconClose.vue";
import { view } from "../stores/view.js";
import * as focusTrap from "focus-trap";

export default {
  components: { IconClose },
  props: {
    close: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      view,
      trap: null,
    };
  },
  mounted() {
    this.trap = focusTrap.createFocusTrap(this.$refs.dialog);
    this.trap.activate();
  },
  unmounted() {
    this.trap.deactivate();
  },
};
</script>
