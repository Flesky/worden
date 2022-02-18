<template>
  <BoardRow :center="demo">
    <BoardTile
      v-for="(tile, i) in word"
      :key="i"
      :tile="tile"
      :small="demo"
    ></BoardTile>
  </BoardRow>
</template>

<script>
import BoardRow from "./BoardRow.vue";
import BoardTile from "./BoardTile.vue";

export default {
  components: { BoardRow, BoardTile },
  props: {
    word: Object,
    demo: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
