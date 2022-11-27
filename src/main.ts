import { HttpClientModule } from "@angular/common/http";
import { enableProdMode, importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, withDebugTracing } from "@angular/router";
import { APP_ROUTES } from "@app/routes/app-routing";
import { GeoipAppInitializerProvider } from "@app/services/geoip-data.service";
import { EnvironmentTokenProvider } from "@app/tokens/environment.token";
import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),

    environment.production
      ? provideRouter(APP_ROUTES)
      : provideRouter(APP_ROUTES, withDebugTracing()),
    EnvironmentTokenProvider,
    GeoipAppInitializerProvider,
  ],
}).catch((err) => console.error(err));
