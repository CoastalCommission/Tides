(function () {
    'use strict';

    // higs app
    angular.module('tides', [
       // global dependencies
       'ngRoute',
       'ngResource',
       'ngCookies',
       'ngMaterial',
       'hc.marked',
       'uiGmapgoogle-maps',
       'dndLists',
       'toaster',

       // services
       'tides.services',

       // pages
       'tides.login',
       'tides.dashboard',
       'tides.friends',
       'tides.agendas',
       'tides.reports',
       'tides.slides',
       'tides.press',
       'tides.cleanup',
       'tides.access'
    ])


    .config(['markedProvider', function(markedProvider) {
        markedProvider.setOptions({
            gfm: true,
            tables: true
        });
    }])

    .config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDU97BUZsIGAOpbOU6al0SN76Qq6U_ujzk',
            v: '3.17',
            libraries: 'weather,geometry,places'
        });
    }])


    .run(['$rootScope', '$location', '$cookies', '$cookieStore', 'toaster', '$log',  '$mdSidenav',
    function($rootScope, $location, $cookies, $cookieStore, toaster, $log, $mdSidenav){

        $rootScope.authenticated = false;
        $rootScope.services = [];

        $rootScope.$on('$routeChangeStart', function (event, next) {
            // route interception & forced login
            if(next.originalPath                  !== '/login' &&
               $cookieStore.get('authentication') === undefined &&
               next.access                        !== undefined) {

                $cookieStore.remove('authentication');
                $location.path('/login');
            }

            if($cookieStore.get('authentication') !== undefined) {
                $rootScope.authenticated = $cookieStore.get('authentication').authenticated;
                $rootScope.username      = $cookieStore.get('authentication').username;
                console.log($rootScope.username);
            } else {
                $rootScope.authenticated = false;
            }
        });

        $rootScope.logout = function logout() {
            $cookieStore.remove('authentication');
            $rootScope.authenticated = false;
            $rootScope.services = [];

            toaster.pop({
                type: 'success',
                title: 'Thanks!',
                body: 'Peace Out',
                showCloseButton: true
            });

            $location.path('/login');
        }

        $rootScope.close = function () {
          $mdSidenav('left').close()
            .then(function () {
              $log.debug("close LEFT is done");
            });
        };

        // lodash alias fix
        // https://github.com/angular-ui/angular-google-maps/issues/1682
        if (typeof _.contains === 'undefined') {
            _.contains = _.includes;
            _.prototype.contains = _.includes;
        }
        if (typeof _.object === 'undefined') {
            _.object = _.zipObject;
        }
        if (typeof _.all === 'undefined') {
            _.all = _.every;
        }
        if (typeof _.any === 'undefined') {
            _.any = _.some;
        }
    }]);
})();
