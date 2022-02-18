<template>
  <BoardContainer>
    <BoardRowComponent
      v-for="(word, i) in board"
      :key="i"
      :word="word"
      :shake="i === shake"
    ></BoardRowComponent>
  </BoardContainer>
</template>

<script>
import BoardContainer from "./BoardContainer.vue";
import BoardRowComponent from "./BoardRowComponent.vue";
export default {
  props: { board: Object, shake: Number },
  components: { BoardContainer, BoardRowComponent },
};
</script>
