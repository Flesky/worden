<template>
  <div class="flex justify-center w-full">
    <div
      class="px-4 py-2 w-max text-white rounded bg-black dark:bg-white dark:text-black"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
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
