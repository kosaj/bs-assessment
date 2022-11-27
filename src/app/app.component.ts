import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { GeoipDataService } from "@app/services/geoip-data.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
export class AppComponent {
  constructor(private _geoipService: GeoipDataService) {
    console.log(_geoipService.value);
  }
}
