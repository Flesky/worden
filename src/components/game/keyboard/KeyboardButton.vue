<template>
  <button
    class="focus:outline-none select-none ml-1 h-10 hi:h-14 leading-10 hi:leading-[3.5rem] text-center align-middle rounded transition"
    :class="classObject"
    tabindex="-1"
  >
    {{ keyboardKey.letter ? keyboardKey.letter : keyboardKey.button }}
  </button>
</template>

<script>
export default {
  props: {
    keyboardKey: Object,
  },
  computed: {
    classObject() {
      return [
        this.keyboardKey.letter ? "w-10" : "w-[3.875rem]",
        this.keyboardKey.evaluation && this.keyboardKey.evaluation !== "invalid"
          ? this.keyboardKey.evaluation
          : "bg-gray-200 dark:bg-gray-500 dark:text-white"
      ];
    },
  },
};
</script>
