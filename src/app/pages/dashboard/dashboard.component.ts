import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { BackendService } from "@app/services/backend.service";
import { merge, tap } from "rxjs";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule],
  template: ` <p>dashboard works!</p> `,
  styleUrls: ["./dashboard.component.scss"],
  providers: [BackendService],
})
export class DashboardComponent implements OnInit {
  constructor(private readonly _backendService: BackendService) {}

  ngOnInit(): void {
    merge([this._backendService.getBet(5)])
      .pipe(tap((result) => console.log(result)))
      .subscribe();
  }
}
