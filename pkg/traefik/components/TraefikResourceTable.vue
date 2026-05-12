<script>
import ResourceFetch from '@shell/mixins/resource-fetch';
import ResourceTable from '@shell/components/ResourceTable.vue';
import {
  AGE,
  NAME,
  NAMESPACE,
  STATE
} from '@shell/config/table-headers';
import { TRAEFIK_RESOURCES } from '../config/traefik';
import {
  joinList,
  middlewareKind,
  middlewareSummary,
  routeMatches,
  serversTransportTls,
  servicesSummary,
  tlsSummary,
  traefikServiceMode,
  traefikServiceTargets,
} from '../utils/formatters';

const ENTRY_POINTS = {
  name:     'entryPoints',
  label:    'EntryPoints',
  value:    'entryPointsDisplay',
  sort:     'entryPointsDisplay',
  search:   ['spec.entryPoints'],
};

const MATCH = {
  name:   'match',
  label:  'Route match',
  value:  'routesDisplay',
  sort:   'routesDisplay',
  search: ['spec.routes.match'],
};

const MIDDLEWARES = {
  name:   'middlewares',
  label:  'Middlewares',
  value:  'middlewaresDisplay',
  sort:   'middlewaresDisplay',
  search: ['spec.routes.middlewares.name'],
};

const SERVICES = {
  name:   'services',
  label:  'Services',
  value:  'servicesDisplay',
  sort:   'servicesDisplay',
  search: ['spec.routes.services.name'],
};

const TLS = {
  name:   'tls',
  label:  'TLS',
  value:  'tlsDisplay',
  sort:   'tlsDisplay',
  search: ['spec.tls.secretName', 'spec.tls.certResolver'],
};

const MIDDLEWARE_KIND = {
  name:   'middlewareKind',
  label:  'Kind',
  value:  'middlewareKindDisplay',
  sort:   'middlewareKindDisplay',
  search: ['spec'],
};

const SERVICE_MODE = {
  name:   'serviceMode',
  label:  'Mode',
  value:  'serviceModeDisplay',
  sort:   'serviceModeDisplay',
  search: ['spec'],
};

const TARGETS = {
  name:   'targets',
  label:  'Targets',
  value:  'targetsDisplay',
  sort:   'targetsDisplay',
  search: ['spec'],
};

const TRANSPORT_TLS = {
  name:   'transportTls',
  label:  'Backend TLS',
  value:  'transportTlsDisplay',
  sort:   'transportTlsDisplay',
  search: ['spec.serverName', 'spec.minVersion', 'spec.maxVersion'],
};

export default {
  name:       'TraefikResourceTable',
  components: { ResourceTable },
  mixins:     [ResourceFetch],

  props: {
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

  async fetch() {
    await this.$fetchType(this.resource);
  },

  computed: {
    headers() {
      const base = [
        STATE,
        NAME,
      ];

      if (this.schema?.attributes?.namespaced) {
        base.push(NAMESPACE);
      }

      const extra = this.headersForResource(this.resource);

      return [
        ...base,
        ...extra,
        AGE,
      ];
    },
  },

  methods: {
    headersForResource(resource) {
      switch (resource) {
      case TRAEFIK_RESOURCES.INGRESS_ROUTE:
        return [ENTRY_POINTS, MATCH, MIDDLEWARES, SERVICES, TLS];
      case TRAEFIK_RESOURCES.MIDDLEWARE:
        return [MIDDLEWARE_KIND];
      case TRAEFIK_RESOURCES.TRAEFIK_SERVICE:
        return [SERVICE_MODE, TARGETS];
      case TRAEFIK_RESOURCES.SERVERS_TRANSPORT:
        return [TRANSPORT_TLS];
      default:
        return this.$store.getters['type-map/headersFor'](this.schema);
      }
    },

    formatEntryPoints(row) {
      return joinList(row?.spec?.entryPoints);
    },

    formatMatch(row) {
      return routeMatches(row);
    },

    formatMiddlewares(row) {
      return middlewareSummary(row);
    },

    formatServices(row) {
      return servicesSummary(row);
    },

    formatTls(row) {
      return tlsSummary(row);
    },

    formatMiddlewareKind(row) {
      return middlewareKind(row);
    },

    formatServiceMode(row) {
      return traefikServiceMode(row);
    },

    formatTargets(row) {
      return traefikServiceTargets(row);
    },

    formatTransportTls(row) {
      return serversTransportTls(row);
    },
  },
};
</script>

<template>
  <ResourceTable
    :schema="schema"
    :headers="headers"
    :rows="rows"
    :loading="loading"
    :namespaced="schema.attributes.namespaced"
    :use-query-params-for-simple-filtering="useQueryParamsForSimpleFiltering"
    :force-update-live-and-delayed="forceUpdateLiveAndDelayed"
  >
    <template #cell:entryPoints="{row}">
      {{ formatEntryPoints(row) }}
    </template>
    <template #cell:match="{row}">
      <span class="monospace">{{ formatMatch(row) }}</span>
    </template>
    <template #cell:middlewares="{row}">
      {{ formatMiddlewares(row) }}
    </template>
    <template #cell:services="{row}">
      {{ formatServices(row) }}
    </template>
    <template #cell:tls="{row}">
      {{ formatTls(row) }}
    </template>
    <template #cell:middlewareKind="{row}">
      {{ formatMiddlewareKind(row) }}
    </template>
    <template #cell:serviceMode="{row}">
      {{ formatServiceMode(row) }}
    </template>
    <template #cell:targets="{row}">
      {{ formatTargets(row) }}
    </template>
    <template #cell:transportTls="{row}">
      {{ formatTransportTls(row) }}
    </template>
  </ResourceTable>
</template>
