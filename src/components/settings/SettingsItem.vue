<template>
  <div class="flex gap-3 justify-between items-center mt-6">
    <div class="flex flex-col gap-2">
      <slot></slot>
    </div>
    <BaseSwitch :enabled="enabled" @click="$emit('switch')"></BaseSwitch>
  </div>
</template>

<script>
import BaseSwitch from "../BaseSwitch.vue";

export default {
  name: "SettingsItem",
  components: { BaseSwitch },
  props: {
    enabled: Boolean,
  },
  emits: ["switch"],
};
</script>

<style scoped></style>
