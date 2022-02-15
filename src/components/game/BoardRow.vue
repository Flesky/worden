<template>
  <div
    class="flex gap-1 w-full"
    name="list"
    :class="[center ? '' : 'justify-center']"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BoardRow",
  components: {},
  props: {
    word: Object,
    center: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
