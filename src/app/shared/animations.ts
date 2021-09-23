import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';

export var itemAnim = [trigger('itemAnim', [
    transition('void => *', [
        style({
            height: 0,
            opacity: 0,
            transform: 'scale(0.85)',
            'margin-bottom': 0,

            padding: 0,

        }),
        animate(50, style({
            height: '*',
            'margin-bottom': '*',
            padding: '*'
        })),
        animate(100)
    ]),

    transition('* =>void', [
        animate(50, style({
            transform: 'scale(1.25)',
        })),
        animate(50, style({
            transform: 'scale(1)',
            opacity: 0.75
        })),
        animate('120ms ease-out', style({
            opacity: 0,
            transform: 'scale(0.68)'
        })),
        animate('150ms ease-out', style({
            height: 0,
            'margin-bottom': 0,
            padding: 0
        }))
    ])
]),
trigger('listAnim', [
    transition('*=>*', [
        query(':enter', [
            style({
                opacity: 0,
                height: 0,
                transform: 'scale(0.85)',
            }),
            stagger(150, [
                    animate('0.2s ease')
                ])
            ], {
            optional: true
        })
    ])
])
]