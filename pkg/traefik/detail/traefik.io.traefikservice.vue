<script>
import TraefikResourceDetail from '../components/TraefikResourceDetail.vue';

export default {
  name:       'TraefikServiceDetail',
  components: { TraefikResourceDetail },
  props:      {
    value: {
      type:     Object,
      required: true,
    },
  },
};
</script>

<template>
  <TraefikResourceDetail :value="value" />
</template>
