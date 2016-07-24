import { Component }             from 'angular2/core';
import { RouteConfig,
         ROUTER_DIRECTIVES,
         ROUTER_PROVIDERS }      from 'angular2/router';

import { DashboardComponent }    from '../dashboard/dashboard.component';
import { HeroesComponent }       from '../heroes/heroes.component';
import { HeroDetailComponent }   from '../hero-detail/hero-detail.component';
import { HeroService }           from '../../services/hero/hero.service';

@Component({
    selector: 'tides-app',
    templateUrl: 'app/components/tides-app/tides-app.component.html',
    styleUrls: ['app/components/tides-app/tides-app.component.css'],
    directives: [
        ROUTER_DIRECTIVES
    ],
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
