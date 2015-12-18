(function () {
    'use strict';

    angular.module('tides.press', ['ngRoute'])


    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/press', {
            templateUrl: 'pages/press/press.html',
            controller: 'PressController',
            access: {
                requiresLogin: true
            }
        });
    }])


    .controller('PressController', ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.stories = [
            {
                'headline': 'Martins Beach Represeants Californian\'s Right to Public Beach Access',
                'type': 'link'
            },
            {
                'headline': 'Sea World Files for Bankrupcy',
                'type': 'format_quote'
            }
        ];

        $scope.editStory = function editStory(story) {
            $scope.editingStory = story;
        };

        $scope.pressTypes = [
            {
                'name': '3rd Party Link',
                'icon': 'link'
            },
            {
                'name': 'CCC Press Release',
                'icon': 'format_quote'
            }
        ];
    }]);
})();
