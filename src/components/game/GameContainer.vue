<template>
  <div id="game" class="flex flex-col h-[calc(100%_-_3.5rem)] px-2 pb-2">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GameContainer",
};
</script>
