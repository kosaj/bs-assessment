import { Injectable } from "@angular/core";
import { ApiService } from "@app/services/api.service";
import { WebsocketService } from "@app/services/websocket.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import * as BetActions from "./bet.actions";

@Injectable()
export class BetEffects {
  readonly init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BetActions.init),
      switchMap((action) =>
        this.apiService.generateBets(action.size).pipe(
          map((bets) => BetActions.initSuccess({ bets })),
          catchError((error) => of(BetActions.initFailure({ error })))
        )
      )
    );
  });

  readonly update$ = createEffect(() => {
    return this.websocketService.betUpdated$.pipe(
      map((bets) => BetActions.updateSuccess({ bets })),
      catchError((error) => of(BetActions.updateFailure({ error })))
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly apiService: ApiService,
    private readonly websocketService: WebsocketService
  ) {}
}
