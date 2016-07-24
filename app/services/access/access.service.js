System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/toPromise'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var AccessService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            AccessService = (function () {
                function AccessService(_http) {
                    this._http = _http;
                    this.accessLocationsUrl = 'http://api.coastal.ca.gov/access/v1/locations'; // URL to API
                }
                AccessService.prototype.getAccessLocations = function () {
                    return this._http.get(this.accessLocationsUrl)
                        .toPromise()
                        .then(function (response) { return response.json().data; })
                        .catch(this.handleError);
                };
                AccessService.prototype.getAccessLocation = function (id) {
                    return this.getAccessLocations()
                        .then(function (accessLocations) { return accessLocations.find(function (accessLocation) { return accessLocation.ID === id; }); });
                };
                AccessService.prototype.saveAccessLocation = function (accessLocation) {
                    if (accessLocation.ID) {
                        return this.put(accessLocation);
                    }
                    return this.post(accessLocation);
                };
                AccessService.prototype.delete = function (accessLocation) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var url = this.accessLocationsUrl + "/id/" + accessLocation.ID;
                    return this._http
                        .delete(url, { headers: headers })
                        .toPromise()
                        .catch(this.handleError);
                };
                AccessService.prototype.post = function (accessLocation) {
                    var headers = new http_1.Headers({
                        'Content-Type': 'application/json' });
                    return this._http
                        .post(this.accessLocationsUrl, JSON.stringify(accessLocation), { headers: headers })
                        .toPromise()
                        .then(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                AccessService.prototype.put = function (accessLocation) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var url = this.accessLocationsUrl + "/id/" + accessLocation.ID;
                    return this._http
                        .put(url, JSON.stringify(accessLocation), { headers: headers })
                        .toPromise()
                        .then(function () { return accessLocation; })
                        .catch(this.handleError);
                };
                AccessService.prototype.handleError = function (error) {
                    console.error('An error occurred', error);
                    return Promise.reject(error.message || error);
                };
                AccessService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AccessService);
                return AccessService;
            }());
            exports_1("AccessService", AccessService);
        }
    }
});
//# sourceMappingURL=access.service.js.map