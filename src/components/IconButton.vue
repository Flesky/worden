<template>
  <button
    :aria-label="path"
    @click="view.setView(path)"
    @keydown.esc="$event.target.blur()"
  >
    <slot></slot>
  </button>
</template>

<script>
import { view } from "../stores/view";

export default {
  name: "IconButton",
  setup() {
    return { view };
  },
  props: {
    path: String,
  },
};
</script>

<style scoped></style>
