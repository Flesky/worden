<template>
  <BaseDialog close>
    <h1>Interface</h1>
    <hr class="mt-3" />
    <SettingsItem
      @switch="
        () => {
          settings.toggleDarkTheme();
        }
      "
      :enabled="settings.darkTheme"
      ><h2>Dark theme</h2></SettingsItem
    >
    <h1 class="mt-12">Difficulty</h1>
    <hr class="mt-3" />
    <SettingsItem
      @switch="
        () => {
          settings.toggleHardMode();
          $emit('initialize');
        }
      "
      :enabled="settings.hardMode"
    >
      <h2>Hard mode</h2>
      <p>
        All revealed letters must be used in subsequent guesses and invalid
        guesses count
      </p>
    </SettingsItem>
    <SettingsItem
      @switch="
        () => {
          settings.toggleExpandedMode();
          $emit('initialize');
        }
      "
      :enabled="settings.expandedMode"
    >
      <h2>Extended mode</h2>
      <p>Use the complete word list that contains harder to guess words</p>
    </SettingsItem>
    <h1 class="mt-12">About</h1>
    <hr class="mt-3" />
    <p class="mt-3">
      Worden is a minimalist clone of the charming word guessing game
      <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a>.
    </p>
    <p class="mt-3">
      Developed by <a href="https://www.twitter.com/brn_rdrg">Baron</a>. This is
      still a work-in-progress.
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
