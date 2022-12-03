import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as BetActions from "./bet.actions";

@Injectable()
export class BetFacade {
  constructor(private readonly store: Store) {}

  initStore(size: number) {
    this.store.dispatch(BetActions.init({ size }));
  }
}
