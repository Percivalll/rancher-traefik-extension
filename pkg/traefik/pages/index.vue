<script>
import {
  CORE_RESOURCE_TYPES,
  L4_RESOURCE_TYPES,
  PRODUCT_NAME,
  TLS_RESOURCE_TYPES,
  TRAEFIK_DOCS_URL,
  TRAEFIK_VERSION
} from '../config/traefik';

const resourceCards = [
  {
    title:       'IngressRoutes',
    resource:    CORE_RESOURCE_TYPES[0],
    description: 'HTTP routers with v3.7 ingressClassName, parentRefs, observability, middleware chains, services, and TLS references.',
  },
  {
    title:       'Middlewares',
    resource:    CORE_RESOURCE_TYPES[1],
    description: 'Reusable HTTP request processing such as StripPrefix, ForwardAuth, Retry, RateLimit, Headers, and redirects.',
  },
  {
    title:       'TraefikServices',
    resource:    CORE_RESOURCE_TYPES[2],
    description: 'Advanced traffic policies for WRR, HRW, mirroring, and v3.7 status-code failover.',
  },
  {
    title:       'ServersTransports',
    resource:    CORE_RESOURCE_TYPES[3],
    description: 'Backend connection settings including SNI, mTLS, HTTP/2, forwarding timeouts, and v3.7 cipher suites.',
  },
];

export default {
  name: 'TraefikOverview',

  data() {
    return {
      docsUrl:        TRAEFIK_DOCS_URL,
      productName:    PRODUCT_NAME,
      resourceCards,
      traefikVersion: TRAEFIK_VERSION,
      tlsResources:   TLS_RESOURCE_TYPES,
      l4Resources:    L4_RESOURCE_TYPES,
    };
  },

  methods: {
    resourceLocation(resource) {
      return {
        name:   `${ PRODUCT_NAME }-c-cluster-resource`,
        params: {
          product:  PRODUCT_NAME,
          cluster:  this.$route.params.cluster || '_',
          resource,
        },
      };
    },
  },
};
</script>

<template>
  <main class="traefik-overview">
    <section class="hero">
      <div class="hero__copy">
        <p class="eyebrow">
          Rancher Extension for Traefik Proxy {{ traefikVersion }}
        </p>
        <h1>Operate Traefik CRDs from Rancher</h1>
        <p class="lede">
          A focused control surface for routing, middleware, advanced service balancing, backend transports, and TLS resources in Kubernetes clusters.
        </p>
        <div class="hero__actions">
          <router-link
            class="btn role-primary"
            :to="resourceLocation(resourceCards[0].resource)"
          >
            Open IngressRoutes
          </router-link>
          <a
            class="btn role-secondary"
            :href="docsUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Traefik docs
          </a>
        </div>
      </div>
      <div class="hero__panel">
        <span class="panel__label">v3.7 highlights</span>
        <ul>
          <li>IngressRoute <code>ingressClassName</code> and <code>parentRefs</code></li>
          <li>TraefikService failover by HTTP status ranges</li>
          <li>ServersTransport backend TLS versions and cipher suites</li>
          <li>Gateway API and NGINX annotation migration visibility</li>
        </ul>
      </div>
    </section>

    <section class="resource-grid">
      <router-link
        v-for="card in resourceCards"
        :key="card.resource"
        class="resource-card"
        :to="resourceLocation(card.resource)"
      >
        <span class="resource-card__type">traefik.io</span>
        <h2>{{ card.title }}</h2>
        <p>{{ card.description }}</p>
      </router-link>
    </section>

    <section class="resource-bands">
      <div class="resource-band">
        <h3>TLS resources</h3>
        <p>Manage TLSOptions and TLSStores for certificate defaults and protocol policy.</p>
        <div class="band-links">
          <router-link
            v-for="resource in tlsResources"
            :key="resource"
            :to="resourceLocation(resource)"
          >
            {{ resource.replace('traefik.io.', '') }}
          </router-link>
        </div>
      </div>
      <div class="resource-band">
        <h3>Layer 4 routing</h3>
        <p>Inspect TCP and UDP IngressRoute resources beside HTTP routing.</p>
        <div class="band-links">
          <router-link
            v-for="resource in l4Resources"
            :key="resource"
            :to="resourceLocation(resource)"
          >
            {{ resource.replace('traefik.io.', '') }}
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.traefik-overview {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero {
  align-items: stretch;
  background:
    radial-gradient(circle at 8% 10%, rgba(36, 193, 176, 0.24), transparent 34%),
    linear-gradient(135deg, var(--body-bg), var(--box-bg));
  border: 1px solid var(--border);
  border-radius: 18px;
  display: grid;
  gap: 28px;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.6fr);
  overflow: hidden;
  padding: 32px;
}

.eyebrow,
.panel__label,
.resource-card__type {
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(34px, 5vw, 64px);
  letter-spacing: -0.05em;
  line-height: 0.94;
  margin: 8px 0 16px;
}

.lede {
  color: var(--muted);
  font-size: 16px;
  line-height: 1.65;
  max-width: 760px;
}

.hero__actions,
.band-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 22px;
}

.btn,
.band-links a {
  border-radius: 999px;
  font-weight: 700;
  padding: 10px 16px;
  text-decoration: none;
}

.role-primary {
  background: var(--primary);
  color: var(--primary-text);
}

.role-secondary,
.band-links a {
  border: 1px solid var(--border);
  color: var(--link);
}

.hero__panel {
  background: rgba(15, 23, 42, 0.06);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 22px;

  ul {
    display: grid;
    gap: 12px;
    margin: 18px 0 0;
    padding-left: 18px;
  }
}

.resource-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.resource-card,
.resource-band {
  background: var(--box-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  color: var(--body-text);
  padding: 22px;
  text-decoration: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.resource-card:hover {
  border-color: var(--primary);
  box-shadow: 0 14px 38px rgba(2, 6, 23, 0.12);
  transform: translateY(-2px);
}

.resource-card h2,
.resource-band h3 {
  margin: 10px 0 8px;
}

.resource-card p,
.resource-band p {
  color: var(--muted);
  line-height: 1.55;
  margin: 0;
}

.resource-bands {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (max-width: 1100px) {
  .hero,
  .resource-grid,
  .resource-bands {
    grid-template-columns: 1fr;
  }
}
</style>
