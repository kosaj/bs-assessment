import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Bet } from "@app/models/bet.interface";
import { BackendService } from "@app/services/backend.service";
import {
  SocketStatus,
  WebsocketService,
} from "@app/services/websocket.service";
import { forkJoin, Subject, take, takeUntil, tap } from "rxjs";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>dashboard works!</h1>
    <button (click)="beginPooling()">Begin</button>
    <button (click)="endPooling()">End</button>
  `,
  styleUrls: ["./dashboard.component.scss"],
  providers: [BackendService],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  constructor(
    private readonly _backendService: BackendService,
    private readonly _websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this._websocketService.connected$
      .pipe(takeUntil(this._destroyed))
      .subscribe((status: SocketStatus) => console.log(status));

    this._websocketService.betUpdated$
      .pipe(takeUntil(this._destroyed))
      .subscribe((bets: Array<Bet>) => console.log(bets));

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

  beginPooling(): void {
    this._backendService
      .startPulling()
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
