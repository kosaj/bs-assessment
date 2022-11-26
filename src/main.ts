import { enableProdMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, withDebugTracing } from "@angular/router";
import { APP_ROUTES } from "@app/routes/app-routing";
import { AppComponent } from "./app/app.component";
import { EnvironmentTokenProvider } from "./app/tokens/environment.token";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES, withDebugTracing()),
    EnvironmentTokenProvider,
  ],
}).catch((err) => console.error(err));
