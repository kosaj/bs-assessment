import { InjectionToken, Provider } from "@angular/core";
import { environment } from "./environment";

export interface Configuration {
  apiUrl: string;
}

export interface Environment {
  production: boolean;
  configuration: Configuration;
}

export const EnvironmentToken = new InjectionToken<Environment>(
  "environmentToken"
);

export const EnvironmentTokenProvider: Provider = {
  provide: EnvironmentToken,
  useValue: Object.freeze(environment),
};
