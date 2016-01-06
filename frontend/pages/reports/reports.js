(function () {
    'use strict';

    angular.module('tides.reports', ['ngRoute'])


    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/reports', {
            templateUrl: 'pages/reports/reports.html',
            controller: 'ReportsController',
            access: {
                requiresLogin: true
            }
        });
    }])


    .controller('ReportsController', ['$scope', '$rootScope', 'marked', function($scope, $rootScope, marked) {
        var previewBuilder = function previewBuilder() {
            return  '![CCC Letterhead](/images/ccc-letterhead.png) \n \n' +
                        '<blockquote id="itemNumber"><h1 class="text-right">' + this.itemNumber + '</h1></blockquote> \n \n' +
                        '<h2 class="text-center">' + this.type + '</h2> \n \n' +
                        'Date: <strong>' + this.date + '</strong> \n \n' +
                        'Contact: <strong>' + this.byline + '</strong> \n' +
                        '_______ \n \n' +
                        this.body
        };

        $scope.reports = [
            {
                'title': 'Application No. 5-15-1638',
                'type': 'STAFF REPORT: CONSENT CALENDAR',
                'icon': 'description',
                'itemNumber': 'W7a',
                'filed_date': '11/02/2015',
                '180th_day_date': '05/04/2016',
                'author': 'M. Alvarado',
                'staff_report_date': '12/17/2015',
                'hearing_date': '01/13/2016',
                'body': '',
                'preview': previewBuilder
            }
        ];

        $scope.editReport = function editReport(report) {
            $scope.editingReport = report;
            // $scope.html = marked(report);
        };

        $scope.addNewReport = function addNewReport(report) {
            $scope.reports.push(report);
        }

        $scope.baseReport = {
            'preview': previewBuilder
        };

        $scope.reportTypes = [
            {
                'name': 'Staff Report',
                'icon': 'person'
            },
            {
                'name': 'Deputy Directors Report',
                'icon': 'group'
            }
        ];
    }]);
})();
