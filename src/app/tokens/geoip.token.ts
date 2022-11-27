import { HttpClient } from "@angular/common/http";
import { InjectionToken, Injector, Provider } from "@angular/core";
import { Environment, EnvironmentToken } from "@app/tokens/environment.token";
import { map } from "rxjs";

export interface Geoip {
  currency: Currency;
  location: Location;
}

interface Currency {
  code: string;
  symbol: string;
  symbolNative: string;
}

interface Location {
  continent: Continent;
  country: Country;
}

interface Country {
  code: string;
  name: string;
  inEU: boolean;
}
interface Continent {
  code: string;
  name: string;
}

export const GeoipToken = new InjectionToken<Geoip>("GeoipToken");

export const GeoipTokenProvider: Provider = {
  provide: GeoipToken,
  deps: [Injector],
  useFactory: (injector: Injector) => {
    const enviroment: Environment = injector.get(EnvironmentToken);
    const httpClient: HttpClient = injector.get(HttpClient);
    const { apiUrl, apiKey } = enviroment.configuration.geoipConfig;

    return enviroment.production
      ? httpClient.get(`${apiUrl}?key=${apiKey}`).pipe(
          map(
            (result: any) =>
              <Geoip>{
                currency: {
                  code: result.currency.code,
                  symbol: result.currency.symbol,
                  symbolNative: result.currency.symbol_native,
                },
                location: {
                  continent: {
                    code: result.location.continent.code,
                    name: result.location.continent.name,
                  },
                  country: {
                    code: result.location.country.code,
                    name: result.location.country.name,
                    inEU: result.location.country.in_eu,
                  },
                },
              }
          ),
          map((result: Geoip) => Object.freeze(result))
        )
      : <Geoip>{
          currency: { code: "PLN", symbol: "PLN", symbolNative: "zł" },
          location: {
            continent: { code: "EU", name: "Europe" },
            country: { code: "PL", inEU: true, name: "Poland" },
          },
        };
  },
};
