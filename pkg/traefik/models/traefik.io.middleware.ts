import SteveModel from '@shell/plugins/steve/steve-class';
import { middlewareKind } from '../utils/formatters';

export default class TraefikMiddleware extends SteveModel {
  get middlewareKindDisplay() {
    return middlewareKind(this as any);
  }
}
