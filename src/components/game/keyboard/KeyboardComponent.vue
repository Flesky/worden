<template>
  <div id="keyboard" class="space-y-1 mx-2">
    <div
      class="flex justify-center ml-[-0.125rem] w-full"
      v-for="(row, i) in keyboard"
      :key="i"
    >
      <template v-for="(key, j) in row" :key="j">
        <div v-if="key.spacer" class="w-[1.375rem] h-10"></div>
        <KeyboardButton
          v-else
          :keyboardKey="key"
          @mouseup.prevent="$emit('handleClick', key)"
        />
      </template>
    </div>
  </div>
</template>

<script>
import KeyboardButton from "./KeyboardButton.vue";

export default {
  components: {
    KeyboardButton,
  },
  props: {
    keyboard: Object,
  },
  emits: ["handleClick"],
};
</script>

<style scoped></style>
