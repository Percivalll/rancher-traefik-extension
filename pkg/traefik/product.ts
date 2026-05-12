import { IPlugin } from '@shell/core/types';
import {
  BLANK_CLUSTER,
  CORE_RESOURCE_TYPES,
  L4_RESOURCE_TYPES,
  PRODUCT_NAME,
  TLS_RESOURCE_TYPES,
  TRAEFIK_RESOURCES
} from './config/traefik';

const OVERVIEW_PAGE = 'dashboard';

const RESOURCE_LABELS: Record<string, string> = {
  [TRAEFIK_RESOURCES.INGRESS_ROUTE]:     'IngressRoutes',
  [TRAEFIK_RESOURCES.MIDDLEWARE]:        'Middlewares',
  [TRAEFIK_RESOURCES.TRAEFIK_SERVICE]:   'TraefikServices',
  [TRAEFIK_RESOURCES.SERVERS_TRANSPORT]: 'ServersTransports',
  [TRAEFIK_RESOURCES.TLS_OPTION]:        'TLSOptions',
  [TRAEFIK_RESOURCES.TLS_STORE]:         'TLSStores',
  [TRAEFIK_RESOURCES.INGRESS_ROUTE_TCP]: 'IngressRouteTCP',
  [TRAEFIK_RESOURCES.INGRESS_ROUTE_UDP]: 'IngressRouteUDP',
};

function resourceRoute(resource: string) {
  return {
    name:   `${ PRODUCT_NAME }-c-cluster-resource`,
    params: {
      product: PRODUCT_NAME,
      cluster: BLANK_CLUSTER,
      resource,
    },
    meta: { product: PRODUCT_NAME, cluster: BLANK_CLUSTER },
  };
}

export function init($extension: IPlugin, store: any) {
  const {
    product,
    configureType,
    virtualType,
    basicType,
  } = $extension.DSL(store, PRODUCT_NAME);

  product({
    icon:    'globe',
    inStore: 'cluster',
    weight:  100,
    to:      {
      name:   `${ PRODUCT_NAME }-c-cluster-${ OVERVIEW_PAGE }`,
      params: {
        product: PRODUCT_NAME,
        cluster: BLANK_CLUSTER,
      },
      meta: { product: PRODUCT_NAME, cluster: BLANK_CLUSTER },
    },
  });

  virtualType({
    labelKey: 'traefik.overview',
    name:     OVERVIEW_PAGE,
    route:    {
      name:   `${ PRODUCT_NAME }-c-cluster-${ OVERVIEW_PAGE }`,
      params: {
        product: PRODUCT_NAME,
        cluster: BLANK_CLUSTER,
      },
      meta: { product: PRODUCT_NAME, cluster: BLANK_CLUSTER },
    },
  });

  [
    ...CORE_RESOURCE_TYPES,
    ...TLS_RESOURCE_TYPES,
    ...L4_RESOURCE_TYPES,
  ].forEach((resource) => {
    configureType(resource, {
      displayName: RESOURCE_LABELS[resource],
      isCreatable: true,
      isEditable:  true,
      isRemovable: true,
      showAge:     true,
      showState:   true,
      canYaml:     true,
      customRoute: resourceRoute(resource),
    });
  });

  basicType([
    OVERVIEW_PAGE,
    ...CORE_RESOURCE_TYPES,
    ...TLS_RESOURCE_TYPES,
    ...L4_RESOURCE_TYPES,
  ]);
}
