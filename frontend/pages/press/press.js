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


    .controller('PressController', ['$scope', '$rootScope', 'marked', function($scope, $rootScope, marked) {
        $rootScope.pageName = "press pieces";

        var previewBuilder = function previewBuilder() {
            return  '![CCC Letterhead](/images/ccc-letterhead.png) \n \n' +
                        ' >> <h2 class="text-center">' + this.headline + '</h2> \n \n' +
                        'Date: <strong>' + this.date + '</strong> \n \n' +
                        'Contact: <strong>' + this.byline + '</strong> \n' +
                        '_______ \n \n' +
                        this.body
        };

        $scope.stories = [
            {
                'headline': 'Coastal Commission Prevails in Dana Point Beach Access Case',
                'type': 'format_quote',
                'byline': ' Noaki Schwartz, PIO, at (562) 833-5487',
                'date': 'July 7, 2015',
                'body': 'DANA POINT, Calif. _ A judge on Thursday ruled that the city of Dana Point could not use claims of teenage partying to limit public beach access through a gated community of multimillion dollar homes. \n \n' +

                    'In a strongly worded decision, the court found that the city’s emergency ordinance was based on “nothing more than speculation, conjecture and fear mongering.” The decision is a significant victory for public access and clarifies that municipalities can’t circumvent the Coastal Act under the guise of protecting the public. \n \n' +

                    ' > “If you have a real, legitimate threat and you need to take emergency action to safeguard the public, you can take steps to do that,” said the agency’s Executive Director Charles Lester. “But you can’t pretend there’s a nuisance just to avoid your Coastal Act obligations.” \n \n' +

                    'Over the years, the commission has occasionally encountered some local governments that have used flimsy excuses to try to limit or shut down beach access instead of taking steps to manage public use. While legitimate public safety emergencies can include oil spills, public stairways washed out by storms or encroaching fires, some cities have used residents’ complaints about trash, partying and traffic to curb [coastal access](http://www.coastal.ca.gov/yourcoast). \n \n' +

                    'Angela Howe, legal director for the Surfrider Foundation which was also a plaintiff, said they were pleased with “this court victory that upholds the Coastal Commission’s authority to protect public beach access for all people along our 1,100 miles of beautiful California coastline." \n \n' +

                    ' > “After five years of fighting this legal battle,” she continued, “and four losses for the city in court, we expect that they can finally drop the litigation and open Strands Beach for full public access.” \n \n' +


                    'Dana Point, with its stunning coastline and a famed point-break called Killer Dana was the heart of the nation’s surf culture in the 1950s and 1960s. A group of local surfers went on to found Hobie surfboards, Clark Foam, Surfer magazine and it remains the center of surf media today. \n \n' +

                    'The lawsuit stems from the Strand at Headlands, a development of beachfront homes that Dana Point approved in the early 2000s. The developer, Sanford Edward, was required to provide new public accessways through the development to the popular beach. This part of the coastline features dramatic sea cliffs rising above the white sand beach and has long been a draw. \n \n' +

                    'The developer had been actively trying to limit access through the community since its approval. In 2009 Edward built gates and, the city, claiming a flood of police reports adopted an emergency ordinance to limit access through those gates during daylight hours. \n \n' +

                    'Commission staff told the city that the municipality did not have the authority to limit hours and directed local officials to remove the illegal gates. Instead, Dana Point officials claimed the city was exempt from the Coastal Act because a public nuisance existed. \n \n' +

                    'The city sued the commission and the Surfrider Foundation sued the city. The lower court initially ruled against the commission, but the court of appeal directed the lower court to reconsider, resulting in Thursday’s victory. When Surfrider won in the lower courts, the city appealed. That suit is on hold in the appeals court pending Thursday’s decision. \n \n' +

                    'Supervising Attorney General Jamee Jordan Patterson and Deputy Attorney General Baine P. Kerr represented the Coastal Commission in the case.  \n \n' +

                    'In her decision, San Diego Superior Court Judge Randa Trapp seized on the city’s weak evidence to shut down access. Trapp quoted a law enforcement representative who told the city officials that if they did not maintain the gates and limited hours then result would be “sex, drugs, rock and roll.” \n \n' +

                    'Trapp called that “sheer speculation.” \n \n' +

                    '“It made for good theater,” she wrote. “It was not, however, rooted in reality.”',
                'preview': previewBuilder
            },
            {
                'headline': 'How Do You Get To YOUR COAST?',
                'type': 'format_quote',
                'byline': ' Noaki Schwartz, PIO at (562) 833-5487',
                'date': 'Sept. 18, 2015',
                'body': '[YourCoast](http://yourcoast.org) is a free, online web app with all the valuable information from the California Coastal Commission\'s popular [California Coastal Access Guide](http://www.ucpress.edu/book.php?isbn=9780520278172) and [Experience the California Coast series](http://www.ucpress.edu/book.php?isbn=9780520258525). \n \n' +

                    'YourCoast is essential for anyone seeking to explore California\'s 1, 270mile-long shoreline via smart phone, tablet, or personal computer. The app contains information for 1,530 coastal accessways, displayed on colorful base maps, with details on the physical setting, facilities, and visitor activities - such as sandy beaches or tide pools, disabled facilities and wheelchair accessible trails, restrooms and parking, campgrounds, trails and visitor centers. \n \n' +

                    'Plan your summer trip anywhere along the California coast by visiting the FREE YourCoast web app at [YourCoast.org](http://yourcoast.org).',
                'preview': previewBuilder
            }
        ];

        $scope.editStory = function editStory(story) {
            $scope.editingStory = story;
            // $scope.html = marked(story);
        };

        $scope.addNewStory = function addNewStory(story) {
            $scope.stories.push(story);
        }

        $scope.baseStory = {
            'headline': '',
            'byline': '',
            'type': '',
            'date': '',
            'body': '',
            'preview': previewBuilder
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

        $scope.topDirections = ['left', 'up'];
        $scope.bottomDirections = ['down', 'right'];
        $scope.isOpen = false;
        $scope.availableModes = ['md-fling', 'md-scale'];
        $scope.selectedMode = 'md-fling';
        $scope.availableDirections = ['up', 'down', 'left', 'right'];
        $scope.selectedDirection = 'up';
    }]);
})();
