(function(){

    angular.module('leagueApp')
        .filter('iif', iif)
        .filter('riotTime', riotTime)
        .filter('imageUrl', imageUrl);

    function iif() {
        return function(input, trueValue, falseValue) {
            return input ? trueValue : falseValue;
        };
    }

    function riotTime() {
        return function(input) {

            var min = Math.floor(input/60) < 10 ? "0" + Math.floor(input/60) : Math.floor(input/60),
                sec = (input % 60)  < 10 ? "0" + (input % 60) : (input % 60);

            return min + ":" + sec;
        };
    }

    function imageUrl(){
        return function(input, version) {

            version = version.split(".")[0];

            var specific;

            if (version >= 5){

                specific = "5.10.1";

            }else{

                specific = "4.17.1";

            }

            var string =  'http://ddragon.leagueoflegends.com/cdn/' + specific + '/img/item/' + encodeURIComponent(input) + '.png';

            var placeholder = 'https://placeholdit.imgix.net/~text?txtsize=15&txt=no+item&w=64&h=64';

            return input == 0 ? placeholder : string;

        };
    }


})();