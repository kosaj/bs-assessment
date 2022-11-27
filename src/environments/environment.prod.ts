import { Environment } from "@app/tokens/environment.token";

export const environment: Environment = {
  production: true,
  configuration: {
    apiUrl: "https://betsys-fe-assessment.herokuapp.com/",
    geoipConfig: {
      apiUrl: "https://api.ipregistry.co/",
      apiKey: "jbw0vkur7rskwppi",
    },
  },
};
