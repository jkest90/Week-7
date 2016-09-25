angular.module('CountriesApp')
    .controller('cControl', cCtrl);

cCtrl.$inject = ['$http'];

function cCtrl($http) {
    console.log('cCtrl:loaded', cCtrl)
    var alpha = this;
    alpha.header = "Ajax Countries List";
    alpha.load = "Load Countries!";
    window = alpha.countries;
    alpha.searchInput = [];

    alpha.getCountries = function() {
         $http.get('/countries')                //STEP 1 - SENDING REQUEST (client side)
            .then(function(response) {          //STEP 4 - WHAT TO DO NEXT WITH RESPONSE
                alpha.countries = response.data;
                console.log('Response from server!');
                console.log(alpha.countries);
            }, function(err) {
                console.error('Could not get country data!')
            });
    }

/* var result = searchTerm ? '?search='+searchTerm : ''; */

    alpha.search = function(input) {                //pass in parameter to get info into this function (whatever our seach result will be)
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

/* Request Response Cycle
f
STEP 1: SENDING REQUEST (client side/angular controller)
    $http.get('/countries');

STEP 2: RECIEVING THE REQUEST (server side)
    app.get('/countries', (req,res){ });

STEP 3: SENDING RESPONSE (can only send 1 response ever) (server side)
    res.send; res.json; res.sendFile; res.redirect; res.end;

STEP 4: WHAT CLIENT SHOULD DO WITH RESPONSE; 'then' promise (client side)
    .then(function(response) { }); */
