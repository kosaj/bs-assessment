import { Environment } from '@app/models/environment.interface';
import 'zone.js/plugins/zone-error';

export const environment: Environment = {
  production: false,
  configuration: {
    backendConfig: {
      apiUrl: 'http://localhost:3000'
    },
    geoipConfig: {
      apiUrl: 'https://api.ipregistry.co',
      apiKey: 'jbw0vkur7rskwppi'
    }
  }
};
