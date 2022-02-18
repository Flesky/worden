<template>
  <div
    class="flex space-x-1 w-full"
    :class="[center ? '' : 'justify-center', shake ? 'animate-shake' : '']"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    word: Object,
    center: {
      type: Boolean,
      default: false,
    },
    shake: {
      type: Boolean,
      default: false,
    }
  },
};
</script>
