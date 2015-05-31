(function(){

    var app = angular.module('leagueApp');

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
                url = './server/?id=' + id;

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

    app.service('gameInfo',  ['$q', '$http', function ($q, $http) {

        var region = 'euw',
            key = '?api_key=b66c38fa-0d8e-4eec-8c6d-e1aeee178df6',
            startUrl = 'https://global.api.pvp.net/api/lol/static-data/' + region,
            champUrl = '/v1.2/champion/';

        this.getChamp = function () {
            var defer = $q.defer(),
                url = startUrl + champUrl + key;

            $http.get(url, {cache: true})
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