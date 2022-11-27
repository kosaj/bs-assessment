import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Environment } from "@app/models/environment.interface";
import { EnvironmentToken } from "@app/tokens/environment.token";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  private readonly _apiUrl =
    this._environment.configuration.backendConfig.apiUrl;

  constructor(
    @Inject(EnvironmentToken)
    private readonly _environment: Environment,
    private readonly _httpClient: HttpClient
  ) {}

  getBets(): Observable<any> {
    return this._httpClient.get(`${this._apiUrl}`);
  }

  getBet(id: number): Observable<any> {
    return this._httpClient.get(`${this._apiUrl}/bets/${id}`);
  }
}
