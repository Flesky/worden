<template>
  <div class="flex gap-3 justify-between items-center mt-6">
    <div class="flex flex-col gap-2">
      <slot></slot>
    </div>
    <button
      role="switch"
      :aria-checked="enabled"
      :class="enabled ? 'bg-green' : 'bg-gray-500'"
      class="inline-flex flex-shrink-0 w-10 h-6 rounded-full transition-colors" @click="$emit('switch')"
    >
      <span class="sr-only">{{label}}</span>
      <span
        aria-hidden="true"
        :class="enabled ? 'translate-x-4' : 'translate-x-0'"
        class="h-5 w-5 rounded-full bg-white transition-transform m-0.5"
      ></span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    enabled: Boolean,
    label: {
      type: String,
      required: true,
    }
  },
  emits: ["switch"],
};
</script>

<style scoped></style>
