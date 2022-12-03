import { Bet } from "@app/models/bet.interface";
import { EntityState } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { betAdapter, BET_FEATURE_KEY } from "./bet.reducer";

export const selectBetState =
  createFeatureSelector<EntityState<Bet>>(BET_FEATURE_KEY);
const { selectEntities } = betAdapter.getSelectors();

export const selectBets = createSelector(
  selectBetState,
  (state: EntityState<Bet>) => selectEntities(state)
);
