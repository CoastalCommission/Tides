import { Component,
         Input,
         OnInit }      from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { Hero }        from '../../services/hero/type/hero.type';
import { HeroService } from '../../services/hero/hero.service';

@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/components/hero-detail/hero-detail.component.html',
    styleUrls: ['app/components/hero-detail/hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;

    constructor(
        private _heroService: HeroService,
        private _routeParams: RouteParams
    ) { }

    ngOnInit() {
        let id = +this._routeParams.get('id');

        this._heroService.getHero(id)
            .then(hero => this.hero = hero);
    }

    goBack() {
        window.history.back();
    }
}
