export const PRODUCT_NAME = 'traefik';
export const BLANK_CLUSTER = '_';

export const TRAEFIK_DOCS_URL = 'https://doc.traefik.io/traefik/';
export const TRAEFIK_VERSION = 'v3.7.0';

export const TRAEFIK_RESOURCES = {
  INGRESS_ROUTE:     'traefik.io.ingressroute',
  MIDDLEWARE:        'traefik.io.middleware',
  TRAEFIK_SERVICE:   'traefik.io.traefikservice',
  SERVERS_TRANSPORT: 'traefik.io.serverstransport',
  TLS_OPTION:        'traefik.io.tlsoption',
  TLS_STORE:         'traefik.io.tlsstore',
  INGRESS_ROUTE_TCP: 'traefik.io.ingressroutetcp',
  INGRESS_ROUTE_UDP: 'traefik.io.ingressrouteudp',
} as const;

export type TraefikResourceType = typeof TRAEFIK_RESOURCES[keyof typeof TRAEFIK_RESOURCES];

export const CORE_RESOURCE_TYPES: TraefikResourceType[] = [
  TRAEFIK_RESOURCES.INGRESS_ROUTE,
  TRAEFIK_RESOURCES.MIDDLEWARE,
  TRAEFIK_RESOURCES.TRAEFIK_SERVICE,
  TRAEFIK_RESOURCES.SERVERS_TRANSPORT,
];

export const TLS_RESOURCE_TYPES: TraefikResourceType[] = [
  TRAEFIK_RESOURCES.TLS_OPTION,
  TRAEFIK_RESOURCES.TLS_STORE,
];

export const L4_RESOURCE_TYPES: TraefikResourceType[] = [
  TRAEFIK_RESOURCES.INGRESS_ROUTE_TCP,
  TRAEFIK_RESOURCES.INGRESS_ROUTE_UDP,
];
