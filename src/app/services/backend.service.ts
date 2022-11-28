import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Environment } from "@app/models/environment.interface";
import { EnvironmentToken } from "@app/tokens/environment.token";
import { Observable } from "rxjs";
import { Manager } from "socket.io-client";

@Injectable({
  providedIn: "root",
})
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
   * @returns
   */
  getBets(): Observable<Array<any>> {
    return this._httpClient.get<Array<any>>(`${this._apiUrl}/bets`);
  }

  /**
   * returns the `bet` object for the given id
   * @param id
   * @returns
   */
  getBet(id: number): Observable<any> {
    return this._httpClient.get<any>(`${this._apiUrl}/bets/${id}`);
  }

  /**
   * generates random bets for the given size
   * @param size
   * @returns
   */
  generateBets(size: number): Observable<any> {
    return this._httpClient.get<any>(
      `${this._apiUrl}/bets-generate?size=${size}`
    );
  }

  /**
   * starts the websocket pulling
   * @param rate
   * @returns
   */
  startPulling(rate: number): Observable<any> {
    return this._httpClient.get(`${this._apiUrl}/pulling/start?rate=${rate}`);
  }

  /**
   * Stop websocket pulling
   */
  stopPulling(): Observable<any> {
    return this._httpClient.get(`${this._apiUrl}/pulling/stop`);
  }
}
