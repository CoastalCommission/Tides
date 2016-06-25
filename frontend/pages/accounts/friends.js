(function () {
    'use strict';

    angular.module('tides.friends', ['ngRoute'])


    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/friends', {
            templateUrl: 'pages/friends/friends.html',
            // controller: 'FriendsController',
            access: {
                requiresLogin: true
            }
        });
    }]);


    // .controller('FriendsController', ['$scope', '$rootScope', function($scope, $rootScope) {
    //
    // }]);
})();
