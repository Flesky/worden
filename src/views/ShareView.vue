<template>
  <BaseDialog>
    <h1>Play a friend's word</h1>
    <hr class="mt-3">
    <p class="mt-3">If you have a Worden link, copy it and click on the button below.</p>
    <p>{{clipboard}}</p>
    <p>{{xc}}</p>
    <button
      class="px-3 py-2 mt-12 w-full text-sm rounded correct grow"
      @click.prevent="cx"
    >
      Play link
    </button>
<!--    $emit('initialize')-->
  </BaseDialog>
</template>

<script>
import BaseDialog from "../components/BaseDialog.vue";

export default {
  name: "StatisticsView",
  components: { BaseDialog },
  data() {
    return {
      clipboard: ""
    }
  },
  computed: {
    xc() {
      return this.clipboard.slice(0, 29) === "https://worden.web.app/?word="
    }
  },
  methods: {
    async cx() {
      navigator.clipboard.readText().then(
        cliptext => this.clipboard = cliptext
      )
    }
  },
  emits: ["initialize"],
};
</script>
