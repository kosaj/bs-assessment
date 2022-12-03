import { Bet } from "@app/models/bet.interface";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import * as BetActions from "./bet.actions";

export const BET_FEATURE_KEY = "bet";

export interface State extends EntityState<Bet> {
  loaded: boolean;
  error?: string | null;
}

export const betAdapter: EntityAdapter<Bet> = createEntityAdapter<Bet>();

export const initialState: State = betAdapter.getInitialState({
  loaded: false,
  error: null,
});

export const betReducer = createReducer(
  initialState,
  on(
    BetActions.initSuccess,
    (state): State => ({
      ...state,
      loaded: true,
    })
  ),
  on(
    BetActions.initFailure,
    (state, { error }): State => ({
      ...state,
      error,
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return betReducer(state, action);
}
