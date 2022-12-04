import { InjectionToken, Provider } from '@angular/core';
import { Environment } from '@app/models/environment.interface';
import { environment } from '../../environments/environment';

export const EnvironmentToken = new InjectionToken<Environment>(
  'EnvironmentToken'
);

export const EnvironmentTokenProvider: Provider = {
  provide: EnvironmentToken,
  useValue: Object.freeze(environment),
};
