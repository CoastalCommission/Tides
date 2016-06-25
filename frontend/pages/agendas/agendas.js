(function () {
    'use strict';

    angular.module('tides.agendas', ['ngRoute'])


    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/agendas', {
            templateUrl: 'pages/agendas/agendas.html',
            // controller: 'AgendasController',
            access: {
                requiresLogin: true
            }
        });
    }])


    .controller('AgendasController', ['$scope', '$rootScope', 'AgendasAPI', function($scope, $rootScope, AgendasAPI) {
        $scope.editingAgenda = null;
        $scope.editingDistrict = null;
        $scope.editingCategory = null;
        $scope.editingItem = null;
        $scope.newAgenda = {
            'hearingDays': []
        };

        $scope.saveNewAgenda = function saveNewAgenda() {
            var agenda = new AgendasAPI.addNewAgenda($scope.newAgenda);
            agenda.$save();
        };

        $scope.addHearingDay = function addHearingDay() {
            var newDay = {
                'districts': []
            };
            $scope.newAgenda.hearingDays.push(newDay);

            console.log($scope.newAgenda);
        };

        $scope.addDistrict = function addDistrict(index) {
            var newDistrict = {
                'categories': []
            };
            $scope.newAgenda.hearingDays[index].districts.push(newDistrict);

            console.log($scope.newAgenda);
        };

        $scope.addCategory = function addCategory(parentIndex, index) {
            var newCategory = {
                'items': []
            };

            $scope.newAgenda.hearingDays[parentIndex].districts[index].categories.push(newCategory);

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
            .districts[parentIndex]
            .categories[index]
            .items.push(newItem);

            console.log($scope.newAgenda);
        }


        $scope.editAgenda = function editAgenda(agenda) {
            $scope.editingAgenda = agenda;
            $scope.editingDistrict = null;
            $scope.editingCategory = null;
            $scope.editingItem = null;
        };

        $scope.editDistrict = function editDistrict(district) {
            $scope.editingAgenda = null;
            $scope.editingDistrict = district;
            $scope.editingCategory = null;
            $scope.editingItem = null;
        };

        $scope.editCategory = function editCategory(category) {
            $scope.editingAgenda = null;
            $scope.editingDistrict = null;
            $scope.editingCategory = category;
            $scope.editingItem = null;
        };

        $scope.editItem = function editItem(item) {
            $scope.editingAgenda = null;
            $scope.editingDistrict = null;
            $scope.editingCategory = null;
            $scope.editingItem = item;
        };


        $scope.toggleControls = function toggleControls(district) {
            district.viewControls = !district.viewControls;
        };

        $scope.toggleItemControls = function toggleItemControls(item) {
            item.viewControls = !item.viewControls;
        };

        $scope.toggleCategoryControls = function toggleCategoryControls(category) {
            category.viewControls = !category.viewControls;
        };

        $scope.backToAgenda = function backToAgenda(district) {
            console.log(district.$parent);
            district = null;
            // editingAgenda = district.$parent;
        };

        $scope.totalItemsInDistrict = function totalItemsInDistrict(district) {
            var total = 0;

            angular.forEach(district.categories, function(key, value) {
                angular.forEach(key.items, function(key,value) {
                    total++;
                });
            });

            return Number(total);
        };

        $scope.totalTimeForDay = function totalTimeForDay(day) {
            var total = 0;

            angular.forEach(day.districts, function(key, value) {
                angular.forEach(key.categories, function(key,value) {
                    angular.forEach(key.items, function(key,value) {
                        total += key.timeEst;
                    });
                });
            });

            return Number(total);
        };

        $scope.totalTimeForDistrict = function totalTimeForDistrict(district) {
            var total = 0;

            angular.forEach(district.categories, function(key, value) {
                angular.forEach(key.items, function(key,value) {
                    total += key.timeEst;
                });
            });

            return Number(total);
        };

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
    }])


    .controller('agendaController', ['AgendasAPI', function(AgendasAPI) {
        var self = this;
        self.editingAgenda = null;

        self.editAgenda = function editAgenda(agenda) {
            self.editingAgenda = agenda;
            self.editingDistrict = null;
            self.editingCategory = null;
            self.editingItem = null;
        };

        self.editDistrict = function editDistrict(district) {
            self.editingAgenda = null;
            self.editingDistrict = district;
            self.editingCategory = null;
            self.editingItem = null;
        };

        self.toggleControls = function toggleControls(district) {
            district.viewControls = !district.viewControls;
        };

        self.totalItemsInDistrict = function totalItemsInDistrict(district) {
            var total = 0;

            angular.forEach(district.categories, function(key, value) {
                angular.forEach(key.items, function(key,value) {
                    total++;
                });
            });

            return Number(total);
        };

        self.totalTimeForDay = function totalTimeForDay(day) {
            var total = 0;

            angular.forEach(day.districts, function(key, value) {
                angular.forEach(key.categories, function(key,value) {
                    angular.forEach(key.items, function(key,value) {
                        total += key.timeEst;
                    });
                });
            });

            return Number(total);
        };

        self.totalTimeForDistrict = function totalTimeForDistrict(district) {
            var total = 0;

            angular.forEach(district.categories, function(key, value) {
                angular.forEach(key.items, function(key,value) {
                    total += key.timeEst;
                });
            });

            return Number(total);
        };

        AgendasAPI.getAllAgendas.query(function(promisedAgendas) {
            self.agendas = promisedAgendas;
        });
    }])

    .controller('districtController', [function() {
        var self = this;
        self.editingDistrict = null;

        self.editCategory = function editCategory(category) {
            self.editingAgenda = null;
            self.editingDistrict = null;
            self.editingCategory = category;
            self.editingItem = null;

            console.log($parent.editingCategory);
        };

        self.toggleCategoryControls = function toggleCategoryControls(category) {
            category.viewControls = !category.viewControls;
        };

    }])

    .controller('categoryController', [function() {
        var self = this;
        self.editingCategory = null;

        self.editItem = function editItem(item) {
            self.editingAgenda = null;
            self.editingDistrict = null;
            self.editingCategory = null;
            self.editingItem = item;
        };

        self.toggleItemControls = function toggleItemControls(item) {
            item.viewControls = !item.viewControls;
        };

    }])

    .controller('editItemController', editItemController);


    function editCategoryController() {
        var self = this;

        self.editingCategory = null;
    }

    function editItemController() {
        var self = this;

        self.editingItem = null;
    }
})();
