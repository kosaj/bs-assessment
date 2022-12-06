import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from "@angular/animations";

export const ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';

export const bodyExpansionAnimations: {
    readonly bodyExpansion: AnimationTriggerMetadata;
} = {
    bodyExpansion: trigger('bodyExpansion', [
        state('collapsed, void', style({height: '0px', visibility: 'hidden'})),
        state('expanded', style({height: '*', visibility: 'visible'})),
        transition(
          'expanded <=> collapsed, void => collapsed',
          animate(ANIMATION_TIMING),
        ),
      ]),
}