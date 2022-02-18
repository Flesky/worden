<template>
  <button
    :class="enabled ? 'bg-green' : 'bg-gray-500'"
    class="inline-flex flex-shrink-0 w-10 h-6 rounded-full transition-colors"
  >
    <span
      :class="enabled ? 'translate-x-4' : 'translate-x-0'"
      class="h-5 w-5 rounded-full bg-white transition-transform m-0.5"
    ></span>
  </button>
</template>

<script>
export default {
  props: {
    enabled: Boolean,
  },
};
</script>
