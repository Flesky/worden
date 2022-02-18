<template>
  <BaseDialog>
    <h1>How to play</h1>
    <p class="mt-3">Guess the secret word in six tries! Each guess must be a valid five-letter word.</p>
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

    <!--    <h1 class="mt-12">About</h1>-->
    <!--    <p class="mt-3">-->
    <!--      Worden is a minimalist clone of the charming word guessing game-->
    <!--      <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a>.-->
    <!--    </p>-->
    <!--    <p class="mt-3">-->
    <!--      Developed by <a href="https://www.twitter.com/brn_rdrg">Baron</a>. This is-->
    <!--      still a work-in-progress.-->
    <!--    </p>-->
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