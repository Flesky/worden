<template>
  <KeyboardContainer>
    <KeyboardRow v-for="(row, i) in keyboard" :key="i">
      <template v-for="(key, j) in row" :key="j">
        <KeyboardSpacer v-if="key.spacer"></KeyboardSpacer>
        <KeyboardButton
          v-else
          :keyboardKey="key"
          @mouseup.prevent="$emit('handleClick', key)"
        ></KeyboardButton> </template></KeyboardRow
  ></KeyboardContainer>
</template>

<script>
import KeyboardRow from "./KeyboardRow.vue";
import KeyboardContainer from "./KeyboardContainer.vue";
import KeyboardSpacer from "./KeyboardSpacer.vue";
import KeyboardButton from "./KeyboardButton.vue";

export default {
  components: {
    KeyboardSpacer,
    KeyboardContainer,
    KeyboardRow,
    KeyboardButton,
  },
  props: {
    keyboard: Object,
  },
  emits: ["handleClick"],
};
</script>

<style scoped></style>
