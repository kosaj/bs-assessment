import { enableProdMode, importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { APP_ROUTES } from "./app/app-routing";
import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";
import { EnvironmentTokenProvider } from "./environments/environment.token";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(APP_ROUTES)),
    EnvironmentTokenProvider,
  ],
}).catch((err) => console.error(err));
