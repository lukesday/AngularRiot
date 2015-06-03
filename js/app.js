(function(){

    angular.module('leagueApp', [ 'ngRoute' ])
        .config(['$routeProvider', '$locationProvider', config]);

    function config($routeProvider, $locationProvider) {
        $routeProvider.
            when('/player/:username', {
                templateUrl: 'js/templates/results-template.html',
                controller: 'PlayerController',
                controllerAs: 'player'
            }).
            when('/champs', {
                templateUrl: 'js/templates/champlist-template.html',
                controller: 'ChampController',
                controllerAs: 'champCtrl'
            }).
            when('/champ/:id', {
                templateUrl: 'championProfile-template.html',
                controller: 'champProfileController',
                controllerAs: 'profile'
            }).
            otherwise({ // Default Route
                redirectTo: '/'
            });

        $locationProvider.html5Mode(false);
    };


})();