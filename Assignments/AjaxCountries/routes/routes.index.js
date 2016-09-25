/* Routes Controller */
var countryList = require('../models/countries.json');  //file path is always relative to the file that we are using require in.
                                                        //where are you now, where is the file that you want to pull in ?
                                                        //vs. sendFile(), and other methods,
                                                        // ./ is always at the root of where you ran the server was started/ran the node cmd.

module.exports = (app) => {                             //expects the app object.

    /* route to get all countries */
    app.get('/countries', (req,res) => {                                    //STEP 2: RECIEVING THE REQUEST
        //if there is a search term in the query string, look for a specific country
        if(req.query.search) {
            var filteredCountries = countryList.filter(function(element) {
                return req.query.search.toLowerCase() === element.name.toLowerCase();
            });
            res.send(filteredCountries);                                     //STEP 3: SENDING RESPONSE (can only send 1 response ever)
        }
        //otherwise, send all countries
        else {
            res.send(countryList);
        }
    });


    app.post('/countries', (req, res) => {
        var countryToUpdate = countryList.filter(function(element){
                return req.body.name.toLowerCase() === element.name.toLowerCase();
        })[0];

        // update the hasTraveled property of the country we passed in
        countryToUpdate.hasTraveled = req.body.hasTraveled;

        res.send(countryToUpdate);
    });
}
