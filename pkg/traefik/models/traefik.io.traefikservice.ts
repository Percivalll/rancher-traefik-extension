import SteveModel from '@shell/plugins/steve/steve-class';
import {
  traefikServiceMode,
  traefikServiceTargets,
} from '../utils/formatters';

export default class TraefikService extends SteveModel {
  get serviceModeDisplay() {
    return traefikServiceMode(this as any);
  }

  get targetsDisplay() {
    return traefikServiceTargets(this as any);
  }
}
