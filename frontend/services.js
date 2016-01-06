(function() {
    'use strict';

    angular.module('tides.services', [])


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
                getAllAgendas: $resource('http://localhost:3040/get/agendas', {}, {
                    query: {
                        method: 'GET',
                        isArray: true,
                        cache: true
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
    }])

    .factory('CloudinaryAPI', ['$rootScope', '$resource', '$cookies', '$cookieStore',
                        function($rootScope, $resource, $cookies, $cookieStore) {

        var remoteBaseURL  = $.cloudinary.url('	https://api.cloudinary.com/v1_1/the-disruptory', {
                                format: 'json',
                                type: 'list'
                            }),
            photos   = {
                getAll: $resource(remoteBaseURL, {}, {
                    query: {
                        method: 'GET',
                        isArray: false,
                        cache: true
                    }
                })
            };

        return photos;
    }]);
})();
