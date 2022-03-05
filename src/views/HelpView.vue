<template>
  <BaseDialog close>
    <h1>How to play</h1>
    <hr class="mt-3" />
    <p class="mt-3">Guess the secret word in six tries!</p>
    <p class="mt-3">
      Each guess must be a valid five-letter word. Hit the enter button to
      submit.
    </p>
    <p class="mt-3">
      After each guess, the tiles will change colors to reflect how close your
      guess was to the word.
    </p>
    <h2 class="mt-6">Examples</h2>
    <BoardRowComponent
      :word="[
        { letter: 'B', evaluation: 'correct' },
        { letter: 'L' },
        { letter: 'I' },
        { letter: 'S' },
        { letter: 'S' },
      ]"
      demo
      class="mt-3"
    ></BoardRowComponent>
    <p class="mt-2">
      The letter <span class="font-bold">B</span> is in the word and in the
      correct spot.
    </p>
    <BoardRowComponent
      :word="[
        { letter: 'A' },
        { letter: 'C', evaluation: 'present' },
        { letter: 'U' },
        { letter: 'T' },
        { letter: 'E' },
      ]"
      class="mt-3"
      demo
    ></BoardRowComponent>
    <p class="mt-2">
      The letter <span class="font-bold">C</span> is in the word but in the
      wrong spot.
    </p>
    <BoardRowComponent
      :word="[
        { letter: 'I' },
        { letter: 'N' },
        { letter: 'D' },
        { letter: 'E', evaluation: 'absent' },
        { letter: 'X' },
      ]"
      demo
      class="mt-3"
    ></BoardRowComponent>
    <p class="mt-2">
      The letter <span class="font-bold">E</span> is not in the word.
    </p>
    <h2 class="mt-6">Hard mode</h2>
    <p class="mt-3">
      Be careful! In hard mode, invalid guesses count towards your guesses while
      not revealing any tiles.
    </p>
    <!--    <p class="mt-3">-->
    <!--      Be careful! In hard mode, non-word guesses are marked invalid — they-->
    <!--      count towards your guesses while not revealing any tiles.-->
    <!--    </p>-->
    <BoardRowComponent
      :word="[
        { letter: 'F', evaluation: 'invalid' },
        { letter: 'R', evaluation: 'invalid' },
        { letter: 'E', evaluation: 'invalid' },
        { letter: 'U', evaluation: 'invalid' },
        { letter: 'D', evaluation: 'invalid' },
      ]"
      demo
      class="mt-3"
    ></BoardRowComponent>
    <p class="mt-2">
      <span class="font-bold">FREUD</span> is not a valid word.
    </p>
  </BaseDialog>
</template>

<script>
import BaseDialog from "../components/BaseDialog.vue";
import BoardRowComponent from "../components/game/board/BoardRowComponent.vue";
export default {
  name: "HelpView",
  components: { BoardRowComponent, BaseDialog },
};
</script>
