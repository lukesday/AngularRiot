(function(){

    var app = angular.module('leagueApp');

    app.controller('MainController',['$location', function($location){

        vm = this;

        vm.title = "Welcome";
        vm.searchable = "";

        vm.searchPlayer = function(){

            if(vm.searchable != null && typeof vm.searchable != "undefined") {

                $location.path('/player/' + (vm.searchable).replace(/\s+/g, ''));
            }


        };

        vm.searchThis = function(player){

            vm.searchable = player;

            vm.searchPlayer();

        };

    }]);

    app.controller('PlayerController',[ 'playerService', 'gameInfo', '$routeParams',  function( playerService, gameInfo, $routeParams){

        pm = this;
        pm.matches = [];
        pm.user = [];
        pm.error;
        pm.loading = false;

        console.log(pm.loading);

        pm.searchPlayer = function(searchName){

            pm.matches = [];
            pm.user = [];
            pm.loading = true;

            console.log(pm.loading);

            playerService.getPlayer(searchName)
                .then(function(response){

                    pm.user = response.data[searchName.toLowerCase()];

                    playerService.getHistory(pm.user.id)
                        .then(function(response) {

                            pm.matches = response.data.matches;

                            console.log((pm.matches[0].matchVersion).split(".")[0]);

                        })
                        .finally(function(){

                            pm.loading = false;

                            console.log(pm.loading);

                        });

                },
                function(err){
                    console.log(err.message);
                    pm.error = err.message;
                });

        };

        if ($routeParams && $routeParams.username){
            console.log($routeParams.username);
            pm.searchPlayer($routeParams.username);
        }


    }]);

})();