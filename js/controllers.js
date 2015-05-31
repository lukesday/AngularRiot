(function(){

    var app = angular.module('leagueApp');

    app.controller('MainController',['$location', function($location){

        vm = this;

        vm.title = "Welcome";
        vm.searchable = "";
        vm.show = true;

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
        pm.empty = false;

        pm.searchPlayer = function(searchName){

            pm.matches = [];
            pm.user = [];
            pm.loading = true;

            pm.empty = false;

            playerService.getPlayer(searchName)
                .then(function(response){


                    pm.user = response.data[searchName.toLowerCase()];

                    playerService.getHistory(pm.user.id)
                        .then(function(response) {

                            pm.matches = response.data.matches;

                            console.log((pm.matches[0].matchVersion).split(".")[0]);

                            pm.matches ? (pm.empty = false) : (pm.empty = true);

                        })
                        .finally(function(){

                            pm.loading = false;

                        });

                },
                function(err){
                    console.log(err.message);
                    pm.error = err.message;
                    pm.loading = false;
                });

        };

        if ($routeParams && $routeParams.username){
            console.log($routeParams.username);
            pm.searchPlayer($routeParams.username);
        }


    }]);

    app.controller('ChampController', ['gameInfo', function(gameInfo){

        var cm = this;

        cm.champs = [];

        gameInfo.getChamp()
            .then(function(response){
                cm.champs = response.data.data;
                console.log(cm.champs);
            })

    }]);

})();