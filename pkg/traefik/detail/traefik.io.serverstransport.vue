<script>
import TraefikResourceDetail from '../components/TraefikResourceDetail.vue';

export default {
  name:       'TraefikServersTransportDetail',
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
