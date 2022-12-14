import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BetFacade } from '@app/+state/bet/bet.facade';
import { MatchRowComponent } from '@app/components/match-row/match-row.component';
import { Bet } from '@app/models/bet.interface';
import { ApiService } from '@app/services/api.service';
import { Observable, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, AsyncPipe, MatchRowComponent],
  template: `
    <div class="match-container">
      <app-match-row
        [item]="bet"
        *ngFor="let bet of allBets$ | async; trackBy: betById"
      ></app-match-row>
    </div>
  `,
  styleUrls: ['./dashboard.component.scss'],
  providers: [BetFacade]
})
export class DashboardPage implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();
  readonly allBets$: Observable<Array<Bet>> = this._betFacade.allBets$;

  constructor(
    private readonly _apiService: ApiService,
    private readonly _betFacade: BetFacade
  ) {}

  ngOnInit(): void {
    this._betFacade.initStore(10);
    this._apiService
      .startPulling(0.15)
      .pipe(take(1), takeUntil(this._destroyed))
      .subscribe();
  }

  ngOnDestroy(): void {
    this._apiService
      .stopPulling()
      .pipe(take(1), takeUntil(this._destroyed))
      .subscribe();

    this._destroyed.next();
    this._destroyed.complete();
  }

  betById(index: number, bet: Bet): number {
    return bet.id;
  }
}
