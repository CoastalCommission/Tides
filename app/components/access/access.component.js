System.register(['angular2/core', 'angular2/router', '../../services/access/access.service'], function(exports_1, context_1) {
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
    var core_1, router_1, access_service_1;
    var AccessComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (access_service_1_1) {
                access_service_1 = access_service_1_1;
            }],
        execute: function() {
            AccessComponent = (function () {
                function AccessComponent(_router, _accessService) {
                    this._router = _router;
                    this._accessService = _accessService;
                }
                AccessComponent.prototype.getAccessLocations = function () {
                    var _this = this;
                    this._accessService.getAccessLocations()
                        .then(function (accessLocations) { return _this.accessLocations = accessLocations; })
                        .catch(this._accessService.handleError);
                };
                AccessComponent.prototype.ngOnInit = function () {
                    this.getAccessLocations();
                };
                AccessComponent = __decorate([
                    core_1.Component({
                        selector: 'access-location',
                        templateUrl: 'app/components/access/access.component.html',
                        styleUrls: ['app/components/access/access.component.css'],
                        directives: [],
                        providers: [
                            access_service_1.AccessService
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, access_service_1.AccessService])
                ], AccessComponent);
                return AccessComponent;
            }());
            exports_1("AccessComponent", AccessComponent);
        }
    }
});
//# sourceMappingURL=access.component.js.map