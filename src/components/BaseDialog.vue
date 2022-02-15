<template>
  <section
    class="overflow-auto fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-white/90 dark:bg-black/90 transition"
  >
    <div class="relative mx-auto max-w-lg h-full">
      <button @click="view.setView()" class="absolute top-4 right-4">
        <IconClose class="dark:fill-white"></IconClose>
      </button>
      <div class="px-4 pb-4 pt-12">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
import IconClose from "./icons/IconClose.vue";
import { view } from "../stores/view.js";

export default {
  name: "BaseDialog",
  components: { IconClose },
  data() {
    return {
      view,
    };
  },
  emits: ["closeDialog"],
};
</script>
