import "zone.js/plugins/zone-error";
import { Environment } from "./environment.token";

export const environment: Environment = {
  production: false,
  configuration: {
    apiUrl: "http://localhost:3000/",
  },
};
