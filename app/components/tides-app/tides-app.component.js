System.register(['angular2/core', 'angular2/router', '../dashboard/dashboard.component', '../heroes/heroes.component', '../hero-detail/hero-detail.component', '../../services/hero/hero.service', '../access/access.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, dashboard_component_1, heroes_component_1, hero_detail_component_1, hero_service_1, access_component_1;
    var TidesAppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (heroes_component_1_1) {
                heroes_component_1 = heroes_component_1_1;
            },
            function (hero_detail_component_1_1) {
                hero_detail_component_1 = hero_detail_component_1_1;
            },
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            },
            function (access_component_1_1) {
                access_component_1 = access_component_1_1;
            }],
        execute: function() {
            TidesAppComponent = (function () {
                function TidesAppComponent() {
                    this.title = 'Tides';
                }
                TidesAppComponent = __decorate([
                    core_1.Component({
                        selector: 'tides-app',
                        templateUrl: 'app/components/tides-app/tides-app.component.html',
                        styleUrls: ['app/components/tides-app/tides-app.component.css'],
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            hero_service_1.HeroService
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/dashboard',
                            name: 'Dashboard',
                            component: dashboard_component_1.DashboardComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/detail/:id',
                            name: 'HeroDetail',
                            component: hero_detail_component_1.HeroDetailComponent
                        },
                        {
                            path: '/heroes',
                            name: 'Heroes',
                            component: heroes_component_1.HeroesComponent
                        },
                        {
                            path: '/access',
                            name: 'Access',
                            component: access_component_1.AccessComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], TidesAppComponent);
                return TidesAppComponent;
            }());
            exports_1("TidesAppComponent", TidesAppComponent);
        }
    }
});
//# sourceMappingURL=tides-app.component.js.map