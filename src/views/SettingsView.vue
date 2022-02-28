<template>
  <BaseDialog close>
    <h1>Settings</h1>
    <hr class="mt-3" />
    <SettingsItem
      @switch="
        () => {
          settings.darkTheme = !settings.darkTheme;
        }
      "
      :enabled="settings.darkTheme"
      ><h2>Dark theme</h2></SettingsItem
    >
    <SettingsItem
      @switch="
        () => {
          settings.hardMode = !settings.hardMode;
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
          settings.expandedMode = !settings.expandedMode;
          $emit('initialize');
        }
      "
      :enabled="settings.expandedMode"
    >
      <h2>Extended mode</h2>
      <p>Use the complete word list that contains harder to guess words</p>
    </SettingsItem>
    <h1 class="mt-12">About</h1>
    <hr class="mt-3">
    <p class="mt-3">Worden is an elegant, minimal take on the charming word guessing game <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a>.</p>
    <p class="mt-3">Developed by <a href="https://twitter.com/brn_rdrg">Baron</a>. This is still a work-in-progress.</p>
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
