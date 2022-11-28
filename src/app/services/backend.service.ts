import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Bet } from "@app/models/bet.interface";
import { Environment } from "@app/models/environment.interface";
import { EnvironmentToken } from "@app/tokens/environment.token";
import { map, Observable } from "rxjs";
import { Manager } from "socket.io-client";

@Injectable()
//NOTE: we provide this service in dashboard.component.ts
export class BackendService {
  private readonly _apiUrl =
    this._environment.configuration.backendConfig.apiUrl;

  private readonly manager = new Manager(this._apiUrl, { autoConnect: false });

  constructor(
    @Inject(EnvironmentToken)
    private readonly _environment: Environment,
    private readonly _httpClient: HttpClient
  ) {}

  /**
   * returns an array of `bet`.
   * @returns {Observable<Array<Bet>>}
   */
  getBets(): Observable<Array<Bet>> {
    return this._httpClient.get<Array<Bet>>(`${this._apiUrl}/bets`);
  }

  /**
   * returns the `bet` object for the given id
   * @param {number} id
   * @returns {Observable<Bet>}
   */
  getBet(id: number): Observable<Bet> {
    return this._httpClient.get<Bet>(`${this._apiUrl}/bets/${id}`);
  }

  /**
   * generates random bets for the given size
   * @param {number} size
   * @returns {Observable<Array<Bet>>}
   */
  generateBets(size: number): Observable<Array<Bet>> {
    return this._httpClient
      .get(`${this._apiUrl}/bets-generate?size=${size}`)
      .pipe(map((result: any) => result.bets));
  }

  /**
   * starts the websocket pulling
   * @param {number} rate - rate is in request by second
   * @returns {Observable<void>}
   */
  startPulling(rate: number): Observable<void> {
    return this._httpClient.get<void>(
      `${this._apiUrl}/pulling/start?rate=${rate}`
    );
  }

  /**
   * Stop websocket pulling
   * @returns {Observable<void>}
   */
  stopPulling(): Observable<void> {
    return this._httpClient.get<void>(`${this._apiUrl}/pulling/stop`);
  }
}
