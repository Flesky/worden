<template>
  <div
    class="flex space-x-1 w-full"
    :class="{ 'justify-center' : !demo, 'animate-shake' : shake}">
    <BoardTile
      v-for="(tile, i) in word"
      :key="i"
      :tile="tile"
      :small="demo"/>
  </div>
</template>

<script>
import BoardTile from "./BoardTile.vue";

export default {
  components: {  BoardTile },
  props: {
    word: Object,
    demo: {
      type: Boolean,
      default: false,
    },
    shake: Boolean
  },
};
</script>

<style scoped></style>
