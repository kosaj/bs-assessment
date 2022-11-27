import { Environment } from "@app/tokens/environment.token";
import "zone.js/plugins/zone-error";

export const environment: Environment = {
  production: false,
  configuration: {
    apiUrl: "http://localhost:3000/",
    geoipConfig: {
      apiUrl: "https://api.ipregistry.co/",
      apiKey: "jbw0vkur7rskwppi",
    },
  },
};
