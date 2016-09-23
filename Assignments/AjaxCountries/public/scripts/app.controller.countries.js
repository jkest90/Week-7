angular.module('CountriesApp')
    .controller('cControl', cCtrl);

cCtrl.$inject = ['$http'];

function cCtrl($http) {
    console.log('cCtrl:loaded', cCtrl)
    var alpha = this;
    alpha.header = "Ajax Countries List";
    alpha.load = "Load Countries!";
    window = alpha.countries;
    alpha.searchInput = '';

    alpha.getCountries = function() {
         $http.get('/countries')
            .then(function(response) {
                alpha.countries = response.data;
                console.log('Response from server!');
                console.log(alpha.countries);
            }, function(err) {
                console.error('Could not get country data!')
            });
    }

    alpha.search = function(input) {
        $http.get('/search?name=' + input)
            .then(function(response) {
                alpha.search = response.data;
                console.log('Response from search!');
                console.log(alpha.search);
            }, function(err) {
                console.error('Error! Could not get search data')
            });
    }
}
