import { Component }           from 'angular2/core';
import { RouteConfig,
         ROUTER_DIRECTIVES,
         ROUTER_PROVIDERS }    from 'angular2/router';

import { DashboardComponent }  from '../../dashboard.component';
import { HeroesComponent }     from '../../heroes.component';
import { HeroDetailComponent } from '../../hero-detail.component';
import { HeroService }         from '../../hero.service';

@Component({
    selector: 'tides-app',
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a [routerLink]="['Dashboard']">Dashboard</a>
            <a [routerLink]="['Heroes']">Heroes</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    styleUrls: ['app/components/tides-app/tides-app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HeroService
    ]
})

@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/detail/:id',
        name: 'HeroDetail',
        component: HeroDetailComponent
    },
    {
        path: '/heroes',
        name: 'Heroes',
        component: HeroesComponent
    }
])

export class TidesAppComponent {
    title = 'Tides';
}
