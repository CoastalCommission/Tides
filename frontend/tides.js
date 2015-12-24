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
       'toaster',

       // services
       'tides.services',

       // pages
       'tides.login',
       'tides.dashboard',
       'tides.add',
       'tides.agendas',
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
                body: 'Peace Out ' + $rootScope.authenticated + ' ' +  $rootScope.services,
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
    }]);
})();
