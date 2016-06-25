(function() {
    'use strict';

    angular.module('tides.services', [])


    .factory('ContentTypesAPI', ['$resource', function($resource) {
        var contentTypes = [
                'Press Pieces',
                'Cleanup Day Locations',
                'Access Locations',
                'Friends'
            ],
            contentTypesAPI = {
                getAll: function() {
                    return contentTypes;
                }
            };

        return contentTypesAPI;
    }])


    .factory('ColorsAPI', ['$resource', function($resource) {
        var colors = [
                'red',
                'pink',
                'purple',
                'deep-purple',
                'indigo',
                'blue',
                'light-blue',
                'cyan',
                'teal',
                'green',
                'light-green',
                'lime',
                'yellow',
                'amber',
                'orange',
                'deep-orange',
                'brown',
                'grey',
                'blue-grey'
            ],
            colorsAPI = {
                getAll: function() {
                    return colors;
                }
            };

        return colorsAPI;
    }])


    .factory('AuthenticationAPI', ['$resource', function($resource) {
        var authenticationAPI = {
                authenticate: $resource('http://localhost:3040/login', {}, {
                    query: {
                        method: 'POST',
                        params: {
                            post: true
                        }
                    }
                }),
                add: $resource('http://localhost:3040/add/users', {}, {
                    query: {
                        method: 'POST',
                        params: {
                            post: true
                        }
                    }
                })
            };

        return authenticationAPI;
    }])


    .factory('FriendsAPI', ['$resource', function($resource) {
        var friendsAPI = {
                getAll: $resource('http://localhost:3040/get/users', {}, {
                    query: {
                        method: 'GET',
                        isArray: true,
                        cache: true
                    }
                })
            };

        return friendsAPI;
    }])


    .factory('AccessAPI', ['$rootScope', '$resource', '$cookies', '$cookieStore',
                        function($rootScope, $resource, $cookies, $cookieStore) {

        var remoteBaseURL  = 'http://api.coastal.ca.gov/access/v1/locations',
            locations   = {
                getAll: $resource(remoteBaseURL, {}, {
                    query: {
                        method: 'GET',
                        isArray: true,
                        cache: true
                    }
                })
            };

        return locations;
    }])


    .factory('CleanupAPI', ['$rootScope', '$resource', '$cookies', '$cookieStore',
                        function($rootScope, $resource, $cookies, $cookieStore) {

        var remoteBaseURL  = 'http://api.coastal.ca.gov/ccd/v1/locations',
            locations   = {
                getAll: $resource(remoteBaseURL, {}, {
                    query: {
                        method: 'GET',
                        isArray: true,
                        cache: true
                    }
                })
            };

        return locations;
    }])


    .factory('AgendasAPI', ['$rootScope', '$resource', '$cookies', '$cookieStore',
                    function($rootScope, $resource, $cookies, $cookieStore) {

        var agendas   = {
                getAllAgendas: $resource('pages/agendas/agendas.json', {}, {
                    query: {
                        method: 'GET',
                        isArray: true
                        // cache: true
                    }
                }),
                getAllMonths: $resource('http://localhost:3040/get/months', {}, {
                    query: {
                        method: 'GET',
                        isArray: true,
                        cache: true
                    }
                }),
                getAllDays: $resource('http://localhost:3040/get/days', {}, {
                    query: {
                        method: 'GET',
                        isArray: true,
                        cache: true
                    }
                }),
                getAllStatus: $resource('http://localhost:3040/get/status', {}, {
                    query: {
                        method: 'GET',
                        isArray: true,
                        cache: true
                    }
                }),
                getAllDistricts: $resource('http://localhost:3040/get/districts', {}, {
                    query: {
                        method: 'GET',
                        isArray: true,
                        cache: true
                    }
                }),
                getAllCategories: $resource('http://localhost:3040/get/categories', {}, {
                    query: {
                        method: 'GET',
                        isArray: true,
                        cache: true
                    }
                }),
                getAllItems: $resource('http://localhost:3040/get/items', {}, {
                    query: {
                        method: 'GET',
                        isArray: true,
                        cache: true
                    }
                }),
                addNewAgenda: $resource('http://localhost:3040/add/agendas', {}, {
                    query: {
                        method: 'POST',
                        params: {
                            post: true
                        }
                    }
                })
            };

        return agendas;
    }]);
})();
