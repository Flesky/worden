import { reactive } from "vue";

export const view = reactive({
  name: null,
  toasts: [],
  setView(name) {
    this.name = name || null;
  },
  pushToast(message) {
    this.toasts.push(message);
    if (this.toasts.length > 5) {
      this.toasts.shift();
    }
  },
});
