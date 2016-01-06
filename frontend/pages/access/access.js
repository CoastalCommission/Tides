(function() {
    'use strict';

    angular.module('tides.access', ['ngRoute'])


    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/access', {
            templateUrl: 'pages/access/access.html',
            controller: 'AccessController',
            access: {
                requiresLogin: true
            }
        });
    }])


    .controller('AccessController', ['$scope', '$rootScope', 'AccessAPI', function($scope, $rootScope, AccessAPI) {
        AccessAPI.getAll.query(function(promisedLocations) {
            $scope.locations = promisedLocations;
        });

        $scope.editLocation = function(location) {
            if(location.FEE === "Yes") {
                location.FEE = true;
            }

            if(location.PARKING === "Yes") {
                location.PARKING = true;
            }

            if(location.DSABLDACSS === "Yes") {
                location.DSABLDACSS = true;
            }

            if(location.RESTROOMS === "Yes") {
                location.RESTROOMS = true;
            }

            if(location.VISTOR_CTR === "Yes") {
                location.VISTOR_CTR = true;
            }

            if(location.DOG_FRIENDLY === "Yes") {
                location.DOG_FRIENDLY = true;
            }

            if(location.EZ4STROLLERS === "Yes") {
                location.EZ4STROLLERS = true;
            }

            if(location.PCNC_AREA === "Yes") {
                location.PCNC_AREA = true;
            }

            if(location.CAMPGROUND === "Yes") {
                location.CAMPGROUND = true;
            }

            if(location.SNDY_BEACH === "Yes") {
                location.SNDY_BEACH = true;
            }

            if(location.DUNES === "Yes") {
                location.DUNES = true;
            }

            if(location.RKY_SHORE === "Yes") {
                location.RKY_SHORE = true;
            }

            if(location.BLUFF === "Yes") {
                location.BLUFF = true;
            }

            if(location.STRS_BEACH === "Yes") {
                location.STRS_BEACH = true;
            }

            if(location.PTH_BEACH === "Yes") {
                location.PTH_BEACH = true;
            }

            if(location.BLFTP_TRLS === "Yes") {
                location.BLFTP_TRLS = true;
            }

            if(location.BLFTP_PRK === "Yes") {
                location.BLFTP_PRK = true;
            }

            if(location.WLDLFE_VWG === "Yes") {
                location.WLDLFE_VWG = true;
            }

            if(location.TIDEPOOL === "Yes") {
                location.TIDEPOOL = true;
            }

            if(location.VOLLEYBALL === "Yes") {
                location.VOLLEYBALL = true;
            }

            if(location.FISHING === "Yes") {
                location.FISHING = true;
            }

            if(location.BOATING === "Yes") {
                location.BOATING = true;
            }

            $scope.editingLocation = location;
        };

        $scope.topDirections = ['left', 'up'];
        $scope.bottomDirections = ['down', 'right'];
        $scope.isOpen = false;
        $scope.availableModes = ['md-fling', 'md-scale'];
        $scope.selectedMode = 'md-fling';
        $scope.availableDirections = ['up', 'down', 'left', 'right'];
        $scope.selectedDirection = 'up';
    }]);
})();
