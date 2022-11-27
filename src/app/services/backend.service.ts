import { Inject, Injectable } from "@angular/core";
import { Environment } from "@app/models/environment.interface";
import { EnvironmentToken } from "@app/tokens/environment.token";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  constructor(
    @Inject(EnvironmentToken)
    private readonly _environment: Environment
  ) {}
}
