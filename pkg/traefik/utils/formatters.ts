export function asArray(value: any): any[] {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

export function joinList(value: any, fallback = '-') {
  const out = asArray(value).filter(Boolean).map((item) => String(item));

  return out.length ? out.join(', ') : fallback;
}

export function routeMatches(resource: any) {
  return joinList(asArray(resource?.spec?.routes).map((route) => route.match));
}

export function middlewareSummary(resource: any) {
  const middlewares = asArray(resource?.spec?.routes).flatMap((route) => asArray(route.middlewares));

  return joinList(middlewares.map((middleware) => {
    const namespace = middleware.namespace ? `${ middleware.namespace }/` : '';

    return `${ namespace }${ middleware.name }`;
  }));
}

export function servicesSummary(resource: any) {
  const services = asArray(resource?.spec?.routes).flatMap((route) => asArray(route.services));

  return joinList(services.map((service) => {
    const namespace = service.namespace ? `${ service.namespace }/` : '';
    const kind = service.kind || 'Service';
    const port = service.port ? `:${ service.port }` : '';

    return `${ namespace }${ service.name }${ port } (${ kind })`;
  }));
}

export function tlsSummary(resource: any) {
  const tls = resource?.spec?.tls;

  if (!tls) {
    return '-';
  }

  if (tls.secretName) {
    return `Secret: ${ tls.secretName }`;
  }

  if (tls.certResolver) {
    return `Resolver: ${ tls.certResolver }`;
  }

  if (tls.options?.name) {
    return `TLSOption: ${ tls.options.name }`;
  }

  return 'enabled';
}

export function middlewareKind(resource: any) {
  const spec = resource?.spec || {};
  const keys = Object.keys(spec);

  return keys.length ? keys[0] : '-';
}

export function traefikServiceMode(resource: any) {
  const spec = resource?.spec || {};

  if (spec.weighted) {
    return 'Weighted Round Robin';
  }

  if (spec.highestRandomWeight) {
    return 'Highest Random Weight';
  }

  if (spec.mirroring) {
    return 'Mirroring';
  }

  if (spec.failover) {
    return 'Failover';
  }

  return '-';
}

export function traefikServiceTargets(resource: any) {
  const spec = resource?.spec || {};

  if (spec.weighted?.services) {
    return serviceTargetList(spec.weighted.services);
  }

  if (spec.highestRandomWeight?.services) {
    return serviceTargetList(spec.highestRandomWeight.services);
  }

  if (spec.mirroring) {
    const mirrors = asArray(spec.mirroring.mirrors).map((mirror) => `${ mirror.name } (${ mirror.percent || 0 }%)`);

    return joinList([spec.mirroring.name, ...mirrors]);
  }

  if (spec.failover) {
    return joinList([
      spec.failover.service?.name && `primary: ${ spec.failover.service.name }`,
      spec.failover.fallback?.name && `fallback: ${ spec.failover.fallback.name }`,
    ]);
  }

  return '-';
}

export function serversTransportTls(resource: any) {
  const spec = resource?.spec || {};
  const out = [];

  if (spec.serverName) {
    out.push(`SNI: ${ spec.serverName }`);
  }

  if (spec.insecureSkipVerify) {
    out.push('skip verify');
  }

  if (spec.minVersion || spec.maxVersion) {
    out.push(`TLS ${ spec.minVersion || 'any' }-${ spec.maxVersion || 'any' }`);
  }

  if (asArray(spec.certificatesSecrets).length) {
    out.push(`mTLS: ${ asArray(spec.certificatesSecrets).length } secret(s)`);
  }

  return joinList(out);
}

function serviceTargetList(services: any[]) {
  return joinList(asArray(services).map((service) => {
    const kind = service.kind || 'Service';
    const port = service.port ? `:${ service.port }` : '';
    const weight = service.weight ? ` weight ${ service.weight }` : '';

    return `${ service.name }${ port } (${ kind }${ weight })`;
  }));
}
