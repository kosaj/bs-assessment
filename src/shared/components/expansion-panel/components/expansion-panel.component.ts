/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/component-class-suffix */
import {
  Overlay,
  OverlayConfig,
  OverlayModule,
  OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { VButton } from '../../button/button.component';

@Component({
  selector: 'v-expansion-panel',
  standalone: true,
  imports: [OverlayModule, VButton],
  template: ` <button v-fab-button (click)="toggle()">-</button> `,
  styleUrls: ['./expansion-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'v-expansion-panel',
    '[class.v-expansion-panel--expanded]': 'expanded'
  }
})
export class VExpansionPanel implements OnDestroy {
  @Input()
  set componentPortal(value: ComponentPortal<any>) {
    this._portalComponent = value;
  }
  private _portalComponent!: ComponentPortal<any>;
  private overlayRef: OverlayRef | null = null;

  get expanded(): boolean {
    return this._expanded;
  }

  set expanded(value: boolean) {
    this._expanded = value;
  }

  private _expanded = false;

  constructor(public readonly overlay: Overlay) {
    this.overlayRef = this.createOverlay({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop'
    });
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }

  close(): void {
    this.expanded = false;
    this.overlayRef?.detach();
  }

  open(): void {
    this.expanded = true;
    this.overlayRef?.attach(this._portalComponent);

    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.backdropClick().subscribe((_) => this.close());
    }
  }

  toggle(): void {
    // this.expanded = !this.expanded;
    this.expanded ? this.close() : this.open();
  }

  private getOverlayConfig(config: OverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private createOverlay(config: OverlayConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }
}
