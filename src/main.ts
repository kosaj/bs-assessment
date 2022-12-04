import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withDebugTracing } from '@angular/router';
import { BetEffects } from '@app/+state/bet/bet.effects';
import * as fromBet from '@app/+state/bet/bet.reducer';
import { APP_ROUTES } from '@app/routes/app-routing';
import { GetGeoipProvider } from '@app/services/geoip-data.service';
import { EnvironmentTokenProvider } from '@app/tokens/environment.token';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

//NOTE: route debug disabled for now
const hidden = true;

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    hidden ?? environment.production
      ? provideRouter(APP_ROUTES)
      : provideRouter(APP_ROUTES, withDebugTracing()),
    EnvironmentTokenProvider,
    GetGeoipProvider,
    //NGRX
    provideStore({ bet: fromBet.reducer }),
    provideStoreDevtools(),
    provideEffects([BetEffects]),
  ],
}).catch((err: any) => console.error(err));
