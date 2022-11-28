import { EventEmitter, Inject, Injectable, OnDestroy } from "@angular/core";
import { Bet } from "@app/models/bet.interface";
import { Environment } from "@app/models/environment.interface";
import { EnvironmentToken } from "@app/tokens/environment.token";
import {
  BehaviorSubject,
  filter,
  Observable,
  Subject,
  takeUntil,
  tap,
} from "rxjs";
import * as io from "socket.io-client";

enum WebsocketEvent {
  BetUpdated = "bet-updated",
  Connect = "connect",
  Disconnect = "disconnect",
}

export type SocketStatus = "connected" | "disconnected";
export type DisconnectReason =
  | "io server disconnect"
  | "io client disconnect"
  | "ping timeout"
  | "transport close"
  | "transport error";

export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value != null;
}

@Injectable({
  providedIn: "root",
})
export class WebsocketService implements OnDestroy {
  private readonly _destroyed = new Subject<void>();
  private readonly _clientSocket: SocketIOClient.Socket;

  readonly onBetUpdated: EventEmitter<Array<Bet>> = new EventEmitter<
    Array<Bet>
  >();

  private readonly _connectedSource: BehaviorSubject<SocketStatus | null> =
    new BehaviorSubject<SocketStatus | null>(null);
  readonly connected$: Observable<SocketStatus> = this._connectedSource
    .asObservable()
    .pipe(filter(isNonNull));

  constructor(
    @Inject(EnvironmentToken)
    private readonly _environment: Environment
  ) {
    const url = this._environment.configuration.backendConfig.apiUrl;
    this._clientSocket = io.connect(url);

    this._setupObservers();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
    this.onBetUpdated.complete();
  }

  private _setupObservers(): void {
    this._getObservable(WebsocketEvent.Connect)
      .pipe(
        takeUntil(this._destroyed),
        tap(() => {
          this._connectedSource.next("connected");
        })
      )
      .subscribe();

    this._getObservable<DisconnectReason>(WebsocketEvent.Disconnect)
      .pipe(
        takeUntil(this._destroyed),
        tap((reason: DisconnectReason) => {
          console.error("Disconnection reason:", reason);
          this._connectedSource.next("disconnected");
        })
      )
      .subscribe();

    this._getObservable<Array<Bet>>(WebsocketEvent.BetUpdated)
      .pipe(
        takeUntil(this._destroyed),
        tap((bets: Array<Bet>) => this.onBetUpdated.next(bets))
      )
      .subscribe();
  }

  private _getObservable<T = void>(
    websocketEvent: WebsocketEvent
  ): Observable<T> {
    return new Observable((subscribe) => {
      this._clientSocket.on(websocketEvent, (data?: T) => {
        subscribe.next(data);
      });
    });
  }
}
