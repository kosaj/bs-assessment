import { HttpErrorResponse } from "@angular/common/http";
import { Bet } from "@app/models/bet.interface";
import { createAction, props } from "@ngrx/store";

export const init = createAction("[Bet] Initialize", props<{ size: number }>());
export const initSuccess = createAction(
  "[Bet] Initialize Success",
  props<{ bets: Array<Bet> }>()
);
export const initFailure = createAction(
  "[Bet] Initialize Failure",
  props<{ error: HttpErrorResponse }>()
);

export const updateSuccess = createAction(
  "[Bet] Update Success",
  props<{ bets: Array<Bet> }>()
);

export const updateFailure = createAction(
  "[Bet] Update Failure",
  props<{ error: HttpErrorResponse }>()
);
