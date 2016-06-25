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


    .controller('DashboardController', ['$scope', '$rootScope', 'AccessAPI', 'CleanupAPI', 'FriendsAPI', function($scope, $rootScope, AccessAPI, CleanupAPI, FriendsAPI) {
        AccessAPI.getAll.query(function(promisedLocations) {
            $scope.accessCount = promisedLocations.length;
        });

        CleanupAPI.getAll.query(function(promisedLocations) {
            $scope.cleanupCount = promisedLocations.length;
        });

        // ToDo: make FriendsAPI a promise
        $scope.friendCount = 2;
    }]);
})();
