(function(){

    var app = angular.module('leagueApp');

    app.factory('getPlayerInfo', ['$http', function($http){

        return {
            search: function (searchName) {

                vm = this;

                console.log("I'm using a factory woot!");


                vm.searchName = searchName;
                vm.region = 'euw';
                vm.key = '?api_key=b66c38fa-0d8e-4eec-8c6d-e1aeee178df6';
                vm.startUrl = 'https://' + vm.region + '.api.pvp.net/api/lol/' + vm.region;
                vm.playerUrl = '/v1.4/summoner/by-name/';

                var url = vm.startUrl + vm.playerUrl + vm.searchName + vm.key;

                return $http.get(url)
                    .success(function (data) {

                        getPlayerInfo.data

                    }).error(function (status) {

                        switch (status) {

                            case 404:

                                console.log('Summer not found');

                                break;
                            default:

                                console.log('Unknown Error');
                        }

                    });

            },


        }

    }]);

    app.service('playerService', ['$q', '$http', function ($q, $http) {
        var region = 'euw',
            key = '?api_key=b66c38fa-0d8e-4eec-8c6d-e1aeee178df6',
            startUrl = 'https://' + region + '.api.pvp.net/api/lol/' + region,
            playerUrl = '/v1.4/summoner/by-name/',
            historyUrl = '/v2.2/matchhistory/';

        this.getPlayer = function (username) {
            var defer = $q.defer(),
                url = startUrl + playerUrl + username + key;

            $http.get(url)
                .success(function (response) {
                    defer.resolve({
                        data: response
                    });
                })
                .error(function (err, status) {

                    switch (status){
                        case 404:

                            defer.reject({
                                status: status,
                                message: 'User does not exist'
                            });

                            break;
                        default:

                            defer.reject({
                                status: status,
                                message: 'Unknown Error'
                            });

                    }

                });

            return defer.promise;
        };

        this.getHistory = function (id) {
            var defer = $q.defer(),
                url = startUrl + historyUrl + id + key;

            $http.get(url)
                .success(function (response) {
                    defer.resolve({
                        data: response
                    });
                })
                .error(function (err) {
                    defer.reject(err);
                });

            return defer.promise;
        };

    }]);

})();