import { InjectionToken } from "@angular/core";

export interface Configuration {
  apiUrl: string;
}

export interface Environment {
  production: boolean;
  configuration: Configuration;
}

export const environmentToken = new InjectionToken<Environment>(
  "environmentToken"
);
