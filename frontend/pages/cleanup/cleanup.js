(function() {
    'use strict';

    angular.module('tides.cleanup', ['ngRoute'])


    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/cleanup', {
            templateUrl: 'pages/cleanup/cleanup.html',
            controller: 'CleanupController',
            access: {
                requiresLogin: true
            }
        });
    }])


    .controller('CleanupController', ['$scope', '$rootScope', 'CleanupAPI', function($scope, $rootScope, CleanupAPI) {
        CleanupAPI.getAll.query(function(promisedLocations) {
            $scope.locations = promisedLocations;
        });

        $scope.editLocation = function(location) {
            $scope.editingLocation = location;
        };
    }]);
})();
