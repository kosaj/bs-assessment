import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Bet } from "@app/models/bet.interface";
import { BackendService } from "@app/services/backend.service";
import { forkJoin, Subject, take, takeUntil, tap } from "rxjs";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>dashboard works!</p>
    <section
      style="display: inline-flex; border: 1px black solid; padding: 1rem;"
    >
      <button (click)="beginPooling()" style="height: 40px; min-width: 64px">
        Start
      </button>
      <button (click)="endPooling()" style="height: 40px; min-width: 64px">
        Stop
      </button>
    </section>
  `,
  styleUrls: ["./dashboard.component.scss"],
  providers: [BackendService],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  constructor(private readonly _backendService: BackendService) {}

  ngOnInit(): void {
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

    this._backendService.socket.connect();
    this._backendService.socket.on("bet-updated", (...message: Array<Bet>) => {
      console.log("bet-updated", message);
    });
  }

  beginPooling(): void {
    this._backendService
      .startPulling(30)
      .pipe(take(1), takeUntil(this._destroyed))
      .subscribe();
  }

  endPooling(): void {
    this._backendService
      .stopPulling()
      .pipe(take(1), takeUntil(this._destroyed))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.endPooling();

    this._destroyed.next();
    this._destroyed.complete();
  }
}
