import SteveModel from '@shell/plugins/steve/steve-class';
import {
  joinList,
  middlewareSummary,
  routeMatches,
  servicesSummary,
  tlsSummary,
} from '../utils/formatters';

export default class TraefikIngressRoute extends SteveModel {
  get entryPointsDisplay() {
    return joinList((this as any).spec?.entryPoints);
  }

  get routesDisplay() {
    return routeMatches(this as any);
  }

  get middlewaresDisplay() {
    return middlewareSummary(this as any);
  }

  get servicesDisplay() {
    return servicesSummary(this as any);
  }

  get tlsDisplay() {
    return tlsSummary(this as any);
  }
}
