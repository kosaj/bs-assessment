export interface Environment {
  production: boolean;
  configuration: Configuration;
}

interface Configuration {
  backendConfig: BackendConfig;
  geoipConfig: GeoipConfig;
}

interface GeoipConfig {
  apiUrl: string;
  apiKey: string;
}

interface BackendConfig {
  apiUrl: string;
}
