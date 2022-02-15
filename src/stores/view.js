import { reactive } from "vue";

export const view = reactive({
  name: null,
  setView(name) {
    this.name = name || null;
  },
});
