(function(){

    var app = angular.module('leagueApp');

    app.controller('MainController',['$location', function($location){

        vm = this;

        vm.title = "Welcome";
        vm.searchable = "";

        vm.searchPlayer = function(){

            if(vm.searchable != null && typeof vm.searchable != "undefined") {

                $location.path('/player/' + vm.searchable);
            }


        }

    }]);

    app.controller('PlayerController',[ 'playerService', '$routeParams',  function( playerService, $routeParams){

        pm = this;
        pm.matches = [];
        pm.user = [];
        pm.error;

        pm.searchPlayer = function(searchName){

            pm.matches = [];
            pm.user = [];

            playerService.getPlayer(searchName)
                .then(function(response){

                    pm.user = response.data[searchName.toLowerCase()];

                    playerService.getHistory(pm.user.id)
                        .then(function(response) {

                            pm.matches = response.data.matches;

                        })

                },
                function(err){
                    console.log(err.message);
                    pm.error = err.message;
                })

        };

        if ($routeParams && $routeParams.username){
            console.log($routeParams.username);
            pm.searchPlayer($routeParams.username);
        }


    }]);

})();