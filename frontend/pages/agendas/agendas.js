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
        $scope.newAgenda = {};
        $scope.newAgenda.venue_state = "Ca";

        AgendasAPI.getAllAgendas.query(function(promisedAgendas) {
            $scope.agendas = promisedAgendas;

            console.log($scope.agendas);
        });

        $scope.addNewAgenda = function addNewAgenda() {
            var agenda = new AgendasAPI.addNewAgenda($scope.newAgenda);
            agenda.$save();
        };

        AgendasAPI.getAllMonths.query(function(promisedMonths) {
            $scope.months = promisedMonths;

            console.log($scope.months);
        });

        AgendasAPI.getAllDistricts.query(function(promisedDistricts) {
            $scope.districts = promisedDistricts;

            console.log($scope.districts);
        });
    }]);
})();
