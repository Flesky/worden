<template>
  <div id="board" class="flex flex-col space-y-1 justify-center m-2 grow">
    <BoardRowComponent
      v-for="(word, i) in board"
      :key="i"
      :word="word"
      :shake="i === shake"
    ></BoardRowComponent>
  </div>
</template>

<script>
import BoardRowComponent from "./BoardRowComponent.vue";
export default {
  props: { board: Object, shake: Number },
  components: { BoardRowComponent },
};
</script>
