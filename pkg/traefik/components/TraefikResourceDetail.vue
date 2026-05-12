<script>
import {
  middlewareKind,
  middlewareSummary,
  routeMatches,
  serversTransportTls,
  servicesSummary,
  tlsSummary,
  traefikServiceMode,
  traefikServiceTargets,
} from '../utils/formatters';

export default {
  name: 'TraefikResourceDetail',

  props: {
    value: {
      type:     Object,
      required: true,
    },
  },

  computed: {
    summaryRows() {
      const type = this.value?.type || '';

      if (type.endsWith('.ingressroute')) {
        return [
          { label: 'EntryPoints', value: this.value.entryPointsDisplay || '-' },
          { label: 'Route match', value: routeMatches(this.value) },
          { label: 'Middlewares', value: middlewareSummary(this.value) },
          { label: 'Services', value: servicesSummary(this.value) },
          { label: 'TLS', value: tlsSummary(this.value) },
        ];
      }

      if (type.endsWith('.middleware')) {
        return [
          { label: 'Middleware kind', value: middlewareKind(this.value) },
        ];
      }

      if (type.endsWith('.traefikservice')) {
        return [
          { label: 'Mode', value: traefikServiceMode(this.value) },
          { label: 'Targets', value: traefikServiceTargets(this.value) },
        ];
      }

      if (type.endsWith('.serverstransport')) {
        return [
          { label: 'Backend TLS', value: serversTransportTls(this.value) },
          { label: 'HTTP/2 disabled', value: this.value?.spec?.disableHTTP2 ? 'Yes' : 'No' },
          { label: 'Max idle connections', value: String(this.value?.spec?.maxIdleConnsPerHost || 200) },
        ];
      }

      return [];
    },
  },
};
</script>

<template>
  <section
    v-if="summaryRows.length"
    class="traefik-detail"
  >
    <h3>Traefik configuration summary</h3>
    <dl>
      <template
        v-for="row in summaryRows"
        :key="row.label"
      >
        <dt>{{ row.label }}</dt>
        <dd>{{ row.value }}</dd>
      </template>
    </dl>
  </section>
</template>

<style lang="scss" scoped>
.traefik-detail {
  background: var(--box-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  margin: 16px 0;
  padding: 18px;
}

h3 {
  margin: 0 0 16px;
}

dl {
  display: grid;
  gap: 10px 18px;
  grid-template-columns: max-content minmax(0, 1fr);
  margin: 0;
}

dt {
  color: var(--muted);
  font-weight: 700;
}

dd {
  font-family: var(--font-mono);
  margin: 0;
  overflow-wrap: anywhere;
}
</style>
