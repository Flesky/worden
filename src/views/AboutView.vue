<template>
  <BaseDialog>
    <h1>About</h1>
    <hr class="mt-3" />
    <p class="mt-3"></p>
    <p class="mt-3">
      Recently,
      <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a> exploded and
      brought joy to millions of people globally. It has inspired countless
      clones that make a meaningful twist on its essence and ignited a spark in
      developers to try and recreate its charm. Worden is my elegant, minimal
      take on the game to share my philosophies with the world and exercise my
      programming skills.
    </p>
    <p class="mt-3">
      Proudly built with <a href="https://vuejs.org/">Vue.js</a> and
      <a href="https://tailwindcss.com/">Tailwind CSS</a> and deployed to
      <a href="https://firebase.google.com/docs/hosting">Firebase Hosting</a>.
      Font used is
      <a href="https://fonts.google.com/specimen/Inter">Inter</a> via
      <a href="https://fonts.google.com/">Google Fonts</a>. Word list is taken
      from the original
      <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a>.
    </p>
    <p class="mt-3">
      I hope you have as much fun playing as much as I had fun developing this. Thank you!
    </p>
    <p class="mt-8 text-right">Baron#0157</p>
  </BaseDialog>
</template>

<script>
import BaseDialog from "../components/BaseDialog.vue";

export default {
  name: "StatisticsView",
  components: { BaseDialog },
};
</script>
