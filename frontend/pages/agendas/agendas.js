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
                'items': []
            };

            $scope.newAgenda.hearingDays[parentIndex].cards[index].categories.push(newCategory);

            console.log($scope.newAgenda);
        }

        $scope.addItem = function addItem(grandparentIndex, parentIndex, index) {
            var newItem = {
                'cdms_record_id': '',
                'item_number': '',
                'title_english': 'Application No. 5-15-1638 (Bolkin, Pacific Palisades)',
                'title_spanish': '',
                'description_english': 'Application of Bruce Bolkin to demolish 2 single-family homes and construct 7,715 sq.ft., 26 ft.-11 in. high, 2-story single-family home over basement level with attached garage, outdoor swimming pool and lot-tie at 301 & 321 Swarthmore Ave., Pacific Palisades, Los Angeles, Los Angeles County.',
                'description_spanish': '',
                'author': 'MA-LB',
                'duration': '',
                'staff_report_url': '',
                'correspondence_url': '',
                'ex_parte_url': '',
                'addenda_url': '',
                'last_edited_date': '',
                'last_edited_user_id': '',
                'hearing_date_id': '',
                'district_id': '',
                'category_id': '',
                'result_id': ''
            };

            $scope.newAgenda
            .hearingDays[grandparentIndex]
            .cards[parentIndex]
            .categories[index]
            .items.push(newItem);

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
