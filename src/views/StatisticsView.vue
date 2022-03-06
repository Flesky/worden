<template>
  <BaseDialog>
    <StatisticsComponent />
  </BaseDialog>
</template>

<script>
import BaseDialog from "../components/BaseDialog.vue";
import StatisticsComponent from "../components/statistics/StatisticsComponent.vue";

export default {
  name: "StatisticsView",
  components: { StatisticsComponent, BaseDialog },
  emits: ["initialize"],
};
</script>
