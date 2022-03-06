<template>
  <BaseDialog>
    <div id="settings">
      <h1>Settings</h1>
      <hr class="mt-3" />
      <SettingsItem
        @switch="
          () => {
            settings.darkTheme = !settings.darkTheme;
          }
        "
        label="Dark theme"
        :enabled="settings.darkTheme"
        ><h2>Dark theme</h2></SettingsItem
      >
      <SettingsItem
        @switch="settings.toggleHardMode()"
        label="Hard mode"
        :enabled="settings.hardMode"
      >
        <h2>Hard mode</h2>
        <p>
          All revealed letters must be used in subsequent guesses and invalid
          guesses count
        </p>
      </SettingsItem>
      <SettingsItem
        @switch="settings.toggleExpandedMode()"
        label="Expanded mode"
        :enabled="settings.expandedMode"
      >
        <h2>Extended mode</h2>
        <p>Use the complete word list that contains harder to guess words</p>
      </SettingsItem>
    </div>

    <h1 class="mt-12">About</h1>
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
      I hope you have as much fun playing as much as I had fun developing this.
      Thank you! - Baron#0157
    </p>
  </BaseDialog>
</template>

<script>
import BaseDialog from "../components/BaseDialog.vue";
import SettingsItem from "../components/settings/SettingsItem.vue";
import { settings } from "../stores/settings";

export default {
  name: "SettingsView",
  components: { BaseDialog, SettingsItem },
  data() {
    return {
      settings,
    };
  },
  emits: ["initialize"],
};
</script>
