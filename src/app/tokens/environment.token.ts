import { InjectionToken, Provider } from "@angular/core";
import { environment } from "../../environments/environment";

export interface Environment {
  production: boolean;
  configuration: Configuration;
}

interface Configuration {
  apiUrl: string;
  geoipConfig: GeoipConfig;
}

interface GeoipConfig {
  apiUrl: string;
  apiKey: string;
}

export const EnvironmentToken = new InjectionToken<Environment>(
  "EnvironmentToken"
);

export const EnvironmentTokenProvider: Provider = {
  provide: EnvironmentToken,
  useValue: Object.freeze(environment),
};
