(function(){

    var app = angular.module('leagueApp', [ 'ngRoute' ]);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/player/:username', {
                templateUrl: 'js/templates/results-template.html',
                controller: 'PlayerController',
                controllerAs: 'player'
            }).
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
        return function(input) {

            var string =  'http://ddragon.leagueoflegends.com/cdn/5.10.1/img/item/' + encodeURIComponent(input) + '.png';

            var placeholder = 'http://placehold.it/64&text=no+item';

            var dfg = 'https://cdn.championcounter.com/images/items/3128-deathfiregrasp.png?v=1421912021000';

            return input == 0 ? placeholder : (input == 3128 ? dfg : string);

        };
    });

})();