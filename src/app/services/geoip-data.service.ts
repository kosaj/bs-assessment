import { HttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  Inject,
  Injectable,
  OnDestroy,
  Provider
} from '@angular/core';
import { Environment } from '@app/models/environment.interface';
import { EnvironmentToken } from '@app/tokens/environment.token';
import {
  catchError,
  defer,
  map,
  Observable,
  of,
  shareReplay,
  Subject,
  takeUntil,
  tap
} from 'rxjs';

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

function getGeoipDataFactory(geoipDataService: GeoipDataService) {
  return () => geoipDataService.initialize$;
}

@Injectable({
  providedIn: 'root',
})
export class GeoipDataService implements OnDestroy {
  private readonly _destroyed = new Subject<void>();

  readonly initialize$ = defer(() => {
    return (
      this._environment.production ? this._geoipData$ : of(DEFAULT_GEOIP_DATA)
    ).pipe(
      takeUntil(this._destroyed),
      tap((geoipData: GeoipData) => {
        this._value = Object.freeze(geoipData);
      }),
      catchError((error) => {
        console.error(error);
        return of(undefined);
      }),
      shareReplay()
    );
  });

  private readonly _geoipData$: Observable<GeoipData> = defer(() => {
    const { apiUrl, apiKey } = this._environment.configuration.geoipConfig;
    return this._httpClient.get(`${apiUrl}/?key=${apiKey}`).pipe(
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

  get value(): GeoipData | undefined {
    return this._value;
  }

  private _value: GeoipData | undefined;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(EnvironmentToken)
    private readonly _environment: Environment
  ) {}

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

export const GetGeoipProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: getGeoipDataFactory,
  deps: [GeoipDataService],
  multi: true,
};

const DEFAULT_GEOIP_DATA: GeoipData = {
  currency: { code: 'PLN', symbol: 'PLN', symbolNative: 'zł' },
  location: {
    continent: { code: 'EU', name: 'Europe' },
    country: { code: 'PL', inEU: true, name: 'Poland' },
  },
};
