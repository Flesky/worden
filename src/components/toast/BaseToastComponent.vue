<template>
  <BaseToastContainer>
    <TransitionGroup name="toast">
      <BaseToastItem
        v-for="(message, i) in toasts"
        :key="i"
        @toast-expire="$emit('toastExpire')"
        >{{ message }}</BaseToastItem
      >
    </TransitionGroup></BaseToastContainer>
</template>

<script>
import BaseToastItem from "./BaseToastItem.vue";
import BaseToastContainer from "./BaseToastContainer.vue";
export default {
  components: { BaseToastContainer, BaseToastItem },
  props: {
    toasts: Object,
  },
  emits: ["toastExpire"],
};
</script>
