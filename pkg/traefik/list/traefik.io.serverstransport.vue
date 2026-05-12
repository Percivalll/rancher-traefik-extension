<script>
import TraefikResourceTable from '../components/TraefikResourceTable.vue';

export default {
  name:       'TraefikServersTransportList',
  components: { TraefikResourceTable },
  props:      {
    resource: {
      type:     String,
      required: true,
    },
    schema: {
      type:     Object,
      required: true,
    },
    useQueryParamsForSimpleFiltering: {
      type:    Boolean,
      default: false,
    },
  },
};
</script>

<template>
  <TraefikResourceTable
    :resource="resource"
    :schema="schema"
    :use-query-params-for-simple-filtering="useQueryParamsForSimpleFiltering"
  />
</template>
