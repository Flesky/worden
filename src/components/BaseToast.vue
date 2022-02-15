<template>
  <div class="bg-black rounded px-4 py-2 text-white dark:bg-white dark:text-black">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseToast",
  props: {
    message: String,
  },
  mounted() {
    setTimeout(() => {
      this.$emit("toastExpire");
    }, 2000);
  },
  emits: ["toastExpire"],
};
</script>
