import {
  trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';


// Routable animations
export const slideInAnimation =
  trigger('routeAnimation', [
    transition('author <=> tag', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          right: 0,
        })
      ]),
      query(':enter', [
        style({ left: '300%', right: '-300%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '300%', right: '-300%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: 0, right: 0 }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);