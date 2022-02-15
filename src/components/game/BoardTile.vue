<template>
  <div
    class="inline-flex justify-center items-center w-10 h-10 text-lg font-bold rounded border-2 transition"
    :class="classObject"
  >
    {{ value }}
  </div>
</template>

<script>
export default {
  name: "BoardTile",
  props: {
    tile: Object,
    small: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classObject() {
      return [
        this.tile
          ? this.tile.evaluation === undefined
            ? "border-gray-400 dark:border-gray-500 dark:text-white"
            : this.tile.evaluation
          : "border-gray-200 dark:border-gray-700",
        this.small
          ? ""
          : "sm:font-medium sm:w-14 sm:h-14 md:hi:w-16 md:hi:h-16 sm:text-2xl md:hi:text-3xl",
      ];
    },
    value() {
      return this.tile ? this.tile.letter : "";
    },
  },
};
</script>
