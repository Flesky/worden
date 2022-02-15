<template>
  <div id="board" class="relative flex flex-col gap-1 justify-center my-4 grow">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BoardContainer",
};
</script>
