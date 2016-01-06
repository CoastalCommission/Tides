(function () {
    'use strict';

    angular.module('tides.slides', ['ngRoute'])


    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/slides', {
            templateUrl: 'pages/slides/slides.html',
            controller: 'SlidesController',
            access: {
                requiresLogin: true
            }
        });
    }])


    .controller('SlidesController', ['$scope', '$rootScope', 'marked', function($scope, $rootScope, marked) {
        var previewBuilder = function previewBuilder() {
            return  '![CCC Letterhead](/images/ccc-letterhead.png) \n \n' +
                        ' >> <h2 class="text-center">' + this.headline + '</h2> \n \n' +
                        'Date: <strong>' + this.date + '</strong> \n \n' +
                        'Contact: <strong>' + this.byline + '</strong> \n' +
                        '_______ \n \n' +
                        this.body
        };

        $scope.slides = [
            {
                'preview': previewBuilder
            }
        ];

        $scope.editDeck = function editDeck(deck) {
            $scope.editingDeck = deck;
        };

        $scope.addNewDeck = function addNewDeck(deck) {
            $scope.slides.push(deck);
        }

        $scope.baseDeck = {
            'headline': '',
            'byline': '',
            'type': '',
            'date': '',
            'body': '',
            'preview': previewBuilder
        };

        $scope.deckTypes = [
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
