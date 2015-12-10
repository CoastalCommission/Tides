(function () {
    'use strict';

    angular.module('tides.dashboard', ['ngRoute'])


    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'pages/dashboard/dashboard.html',
            controller: 'DashboardController',
            access: {
                requiresLogin: true
            }
        });
    }])


    .controller('DashboardController', ['$scope', '$rootScope', function($scope, $rootScope) {

    }]);
})();
