(function(){

    var app = angular.module('leagueApp', [ 'ngRoute' ]);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
            }),
            otherwise({ // Default Route
                redirectTo: '/'
            });

        $locationProvider.html5Mode(false);
    }]);

    app.filter('iif', function () {
        return function(input, trueValue, falseValue) {
            return input ? trueValue : falseValue;
        };
    });

    app.filter('riotTime', function () {
        return function(input) {

            var min = Math.floor(input/60) < 10 ? "0" + Math.floor(input/60) : Math.floor(input/60),
                sec = (input % 60)  < 10 ? "0" + (input % 60) : (input % 60);

            return min + ":" + sec;
        };
    });

    app.filter('imageUrl', function(){
        return function(input, version) {

            version = version.split(".")[0];

            var specific;

            if (version >= 5){

                specific = "5.10.1";

            }else{

                specific = "4.17.1";

            }

            var string =  'http://ddragon.leagueoflegends.com/cdn/' + specific + '/img/item/' + encodeURIComponent(input) + '.png';

            var placeholder = 'http://placehold.it/64&text=no+item';

            return input == 0 ? placeholder : string;

        };
    });

})();