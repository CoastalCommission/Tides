(function() {
    'use strict';

    angular.module('tides.friends', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/friends', {
            templateUrl: 'pages/friends/friends.html',
            controller: 'FriendsController',
            access: {
                requiresLogin: true
            }
        });
    }])


    .controller('FriendsController', ['$scope', '$rootScope', 'FriendsAPI', 'ContentTypesAPI', 'ColorsAPI', function($scope, $rootScope, FriendsAPI, ContentTypesAPI, ColorsAPI) {
        FriendsAPI.getAll.query(function(promisedFriends) {
            $scope.friends = promisedFriends;
        });

        $scope.contentTypes = ContentTypesAPI.getAll();

        $scope.colors = ColorsAPI.getAll();

        $scope.editFriend = function(friend) {
            $scope.editingFriend = friend;
        };
    }]);
})();
