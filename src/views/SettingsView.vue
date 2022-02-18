<template>
  <BaseDialog>
    <h1>Interface</h1>
    <SettingsItem
      @switch="
        () => {
          settings.toggleDarkTheme();
          $emit('initialize');
        }
      "
      :enabled="settings.darkTheme"
      ><h2>Dark theme</h2></SettingsItem
    >
    <h1 class="mt-12">Difficulty</h1>
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
        All discovered letters must be used in subsequent guesses and invalid
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
