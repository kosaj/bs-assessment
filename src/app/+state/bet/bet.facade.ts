import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as BetActions from "./bet.actions";
import * as BetSelectors from "./bet.selectors";

@Injectable()
export class BetFacade {
  readonly bets$ = this.store.select(BetSelectors.selectBets);

  constructor(private readonly store: Store) {}

  initStore(size: number): void {
    this.store.dispatch(BetActions.init({ size }));
  }
}
