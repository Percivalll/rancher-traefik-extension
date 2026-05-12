import ListResource from '@shell/pages/c/_cluster/_product/_resource/index.vue';
import CreateResource from '@shell/pages/c/_cluster/_product/_resource/create.vue';
import ViewResource from '@shell/pages/c/_cluster/_product/_resource/_id.vue';
import ViewNamespacedResource from '@shell/pages/c/_cluster/_product/_resource/_namespace/_id.vue';
import Overview from '../pages/index.vue';
import { BLANK_CLUSTER, PRODUCT_NAME } from '../config/traefik';

const routes = [
  {
    name:      `${ PRODUCT_NAME }-c-cluster-dashboard`,
    path:      `/${ PRODUCT_NAME }/c/:cluster/dashboard`,
    component: Overview,
    meta:      {
      product: PRODUCT_NAME,
      cluster: BLANK_CLUSTER,
    },
  },
  {
    name:      `${ PRODUCT_NAME }-c-cluster-resource`,
    path:      `/${ PRODUCT_NAME }/c/:cluster/:resource`,
    component: ListResource,
    meta:      {
      product: PRODUCT_NAME,
      cluster: BLANK_CLUSTER,
    },
  },
  {
    name:      `${ PRODUCT_NAME }-c-cluster-resource-create`,
    path:      `/${ PRODUCT_NAME }/c/:cluster/:resource/create`,
    component: CreateResource,
    meta:      {
      product: PRODUCT_NAME,
      cluster: BLANK_CLUSTER,
    },
  },
  {
    name:      `${ PRODUCT_NAME }-c-cluster-resource-id`,
    path:      `/${ PRODUCT_NAME }/c/:cluster/:resource/:id`,
    component: ViewResource,
    meta:      {
      product: PRODUCT_NAME,
      cluster: BLANK_CLUSTER,
    },
  },
  {
    name:      `${ PRODUCT_NAME }-c-cluster-resource-namespace-id`,
    path:      `/${ PRODUCT_NAME }/c/:cluster/:resource/:namespace/:id`,
    component: ViewNamespacedResource,
    meta:      {
      product: PRODUCT_NAME,
      cluster: BLANK_CLUSTER,
    },
  },
];

export default routes;
