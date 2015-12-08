(function () {
    'use strict';

    // higs app
    angular.module('tides', [
       // global dependencies
       'ngRoute',
       'ngResource',
       'ngCookies',
       'ngMaterial',
       'toaster',

       // services
       'tides.services',

       // pages
       'tides.login',
       'tides.dashboard',
       'tides.add',
       'tides.microservice'
    ])


    .config(function() {})


    .run(['$rootScope', '$location', '$cookies', '$cookieStore', 'toaster',
    function($rootScope, $location, $cookies, $cookieStore, toaster){

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
    }]);
})();
