import { Environment } from "@app/models/environment.interface";

export const environment: Environment = {
  production: true,
  configuration: {
    backendConfig: {
      apiUrl: "https://betsys-fe-assessment.herokuapp.com",
    },
    geoipConfig: {
      apiUrl: "https://api.ipregistry.co",
      apiKey: "jbw0vkur7rskwppi",
    },
  },
};
