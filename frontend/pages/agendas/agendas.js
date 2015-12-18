(function () {
    'use strict';

    angular.module('tides.agendas', ['ngRoute'])


    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/agendas', {
            templateUrl: 'pages/agendas/agendas.html',
            controller: 'AgendasController',
            access: {
                requiresLogin: true
            }
        });
    }])


    .controller('AgendasController', ['$scope', '$rootScope', 'AgendasAPI', function($scope, $rootScope, AgendasAPI) {
        $scope.newAgenda = {
            'hearingDays': []
        };

        // $scope.addNewAgenda = function addNewAgenda() {
        //     var agenda = new AgendasAPI.addNewAgenda($scope.newAgenda);
        //     agenda.$save();
        // };

        $scope.addHearingDay = function addHearingDay() {
            var newDay = {
                'cards': []
            };
            $scope.newAgenda.hearingDays.push(newDay);

            console.log($scope.newAgenda);
        };

        $scope.addCard = function addCard(index) {
            var newCard = {
                'categories': []
            };
            $scope.newAgenda.hearingDays[index].cards.push(newCard);

            console.log($scope.newAgenda);
        };

        $scope.addCategory = function addCategory(parentIndex, index) {
            var newCategory = {
                'items': [{}]
            };
            $scope.newAgenda.hearingDays[parentIndex].cards[index].categories.push(newCategory);

            console.log($scope.newAgenda);
        }

        AgendasAPI.getAllAgendas.query(function(promisedAgendas) {
            $scope.agendas = promisedAgendas;
        });

        AgendasAPI.getAllMonths.query(function(promisedMonths) {
            $scope.months = promisedMonths;
        });

        AgendasAPI.getAllDays.query(function(promisedDays) {
            $scope.days = promisedDays;
        });

        AgendasAPI.getAllDistricts.query(function(promisedDistricts) {
            $scope.districts = promisedDistricts;
        });

        AgendasAPI.getAllCategories.query(function(promisedCategories) {
            $scope.categories = promisedCategories;
        });
    }]);
})();
