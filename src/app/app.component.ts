import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
export class AppComponent {
  // constructor(private _geoipService: GeoipDataService) {
  //   console.log(_geoipService.value);
  // }
}
