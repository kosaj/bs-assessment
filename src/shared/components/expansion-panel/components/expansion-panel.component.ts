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
  private readonly overlayRef: OverlayRef;

  constructor(public readonly overlay: Overlay) {
    this.overlayRef = this.createOverlay({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      panelClass: 'bucket-overlay'
    });
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }

  close(): void {
    this.overlayRef?.detach();
  }

  open(): void {
    this.overlayRef?.attach(this._portalComponent);

    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.backdropClick().subscribe((_) => this.close());
    }
  }

  toggle(): void {
    this.overlayRef?.hasAttached() ? this.close() : this.open();
  }

  private getOverlayConfig(config: OverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally();

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
