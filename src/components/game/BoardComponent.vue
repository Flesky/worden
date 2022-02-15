<template>
  <BoardContainer>
    <BoardRowComponent
      v-for="(word, i) in board"
      :key="i"
      :word="word"
    ></BoardRowComponent>
  </BoardContainer>
</template>

<script>
import BoardContainer from "./BoardContainer.vue";
import BoardRowComponent from "./BoardRowComponent.vue";
export default {
  name: "BoardComponent",
  props: { board: Object },
  components: { BoardContainer, BoardRowComponent },
};
</script>
