<template>
  <div class="flex flex-col">
    <div class="text-2xl strong"><slot name="value"></slot></div>
    <div class="text-sm light"><slot name="label"></slot></div>
  </div>
</template>

<script>
export default {
  name: "StatisticsItem"
};
</script>