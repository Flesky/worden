<template>
  <div
    class="flex fixed top-0 left-0 z-10 flex-col gap-6 items-center pt-24 w-full h-full pointer-events-none"
  >
    <TransitionGroup name="toast">
      <BaseToast
        v-for="(message, i) in toasts"
        :key="i"
        @toast-expire="$emit('toastExpire')"
        >{{ message }}</BaseToast
      >
    </TransitionGroup>
  </div>
</template>

<script>
import BaseToast from "./BaseToast.vue";
export default {
  name: "ToastComponent",
  components: { BaseToast },
  props: {
    toasts: Object,
  },
  emits: ["toastExpire"],
};
</script>
