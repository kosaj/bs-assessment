import { Bet } from "@app/models/bet.interface";
import { createAction, props } from "@ngrx/store";

export const init = createAction("[Bet] Initialize", props<{ size: number }>());
export const initSuccess = createAction(
  "[Bet] Initialize Success",
  props<{ bets: Array<Bet> }>()
);
export const initFailure = createAction(
  "[Bet] Initialize Failure",
  props<{ error: any }>()
);
