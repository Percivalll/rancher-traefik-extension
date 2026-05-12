import SteveModel from '@shell/plugins/steve/steve-class';
import { serversTransportTls } from '../utils/formatters';

export default class TraefikServersTransport extends SteveModel {
  get transportTlsDisplay() {
    return serversTransportTls(this as any);
  }
}
