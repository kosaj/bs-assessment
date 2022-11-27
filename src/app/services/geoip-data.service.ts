import { HttpClient } from "@angular/common/http";
import {
  APP_INITIALIZER,
  Inject,
  Injectable,
  Injector,
  OnDestroy,
  Provider,
} from "@angular/core";
import { Environment, EnvironmentToken } from "@app/tokens/environment.token";
import {
  BehaviorSubject,
  defer,
  map,
  Observable,
  of,
  Subject,
  takeUntil,
  tap,
} from "rxjs";

export interface GeoipData {
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

function getGeoipDataFactory(injector: Injector) {
  return () => {
    console.log(
      injector
        .get(GeoipDataService)
        .initialized$.pipe(tap((v) => console.log(v)))
        .subscribe()
    );

    return of(true);
  };
}

export const GetGeoipProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: getGeoipDataFactory,
  deps: [Injector],
  multi: true,
};

const DEFAULT_GEOIP_DATA: GeoipData = {
  currency: { code: "PLN", symbol: "PLN", symbolNative: "zł" },
  location: {
    continent: { code: "EU", name: "Europe" },
    country: { code: "PL", inEU: true, name: "Poland" },
  },
};

@Injectable({
  providedIn: "root",
})
export class GeoipDataService implements OnDestroy {
  private readonly _destroyed = new Subject<void>();
  private readonly _initializedSource = new BehaviorSubject<boolean>(false);
  private readonly _geoipData$: Observable<GeoipData> = defer(() => {
    const { apiUrl, apiKey } = this._environment.configuration.geoipConfig;
    return this._httpClient.get(`${apiUrl}?key=${apiKey}`).pipe(
      map(
        (result: any) =>
          <GeoipData>{
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
      )
    );
  });

  readonly initialized$: Observable<boolean> =
    this._initializedSource.asObservable();

  get value(): GeoipData | undefined {
    return this._value;
  }

  private _value: GeoipData | undefined;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(EnvironmentToken)
    private readonly _environment: Environment
  ) {
    this.getGeoipData();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  private getGeoipData(): void {
    (this._environment.production ? this._geoipData$ : of(DEFAULT_GEOIP_DATA))
      .pipe(
        takeUntil(this._destroyed),
        tap((geoipData: GeoipData) => {
          this._value = Object.freeze(geoipData);
          this._initializedSource.next(true);
        })
      )
      .subscribe();
  }
}
