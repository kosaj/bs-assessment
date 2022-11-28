import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { BackendService } from "@app/services/backend.service";
import { forkJoin, Subject, take, takeUntil, tap } from "rxjs";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule],
  template: ` <p>dashboard works!</p> `,
  styleUrls: ["./dashboard.component.scss"],
  providers: [BackendService],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  constructor(private readonly _backendService: BackendService) {}

  ngOnInit(): void {
    this._backendService
      .startPulling(2)
      .pipe(take(1), takeUntil(this._destroyed))
      .subscribe();

    forkJoin([
      this._backendService.generateBets(10),
      this._backendService.getBets(),
      this._backendService.getBet(5),
    ])
      .pipe(
        takeUntil(this._destroyed),
        tap(([generateBets, getBets, getBet]) => {
          console.log("generateBets", generateBets);
          console.log("getBets", getBets);
          console.log("getBet", getBet);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._backendService
      .stopPulling()
      .pipe(take(1), takeUntil(this._destroyed))
      .subscribe();

    this._destroyed.next();
    this._destroyed.complete();
  }
}
