<template>
  <div
    class="flex fixed top-0 left-0 z-20 flex-col space-y-6 pt-24 w-full h-full pointer-events-none"
  >
    <TransitionGroup name="toast">
      <BaseToastItem
        v-for="(message, i) in toasts"
        :key="i"
        @toast-expire="$emit('toastExpire')"
        >{{ message }}</BaseToastItem
      >
    </TransitionGroup>
  </div>

</template>

<script>
import BaseToastItem from "./BaseToastItem.vue";
export default {
  components: { BaseToastItem },
  props: {
    toasts: Object,
  },
  emits: ["toastExpire"],
};
</script>
