/* Routes Controller */
var countryList = require('../models/countries.json');

module.exports = (app) => {
    app.get('/countries', (req,res) => {
        res.json(countryList);
    })

    app.get('/search', (req,res) => {
        var result = countryList.filter((element) => {       //return true, includes, false does not  include
            if(req.query.name == element.name) {
                return true;
            } else {
                return false;
            }
        })  //element represents  each country in list
        res.send(result);
    })
}
