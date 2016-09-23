require('colors');

/* Requiring dependences */

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    fileServer = express.static('public'),
    Routes = require('./routes/routes.index.js'),       // ./routes assumes index.js
    mongoose = require('mongoose'),
    PORT = process.env.PORT || 1337;


var app = express();

/* Mounting middlewear */

app.use(morgan('dev'));
app.use(fileServer);
app.use(
    bodyParser.json(),
    bodyParser.urlencoded({extended : true})
);


/* Connecting to Mongoose */

mongoose.connect('mongodb://localhost/ajax-countries', (error) =>{
    if(error) {
        console.error('Error, could not start Mongoose!', error);
        process.exit(1);
    } else {
        console.log('Mongose started successfully.' .cyan);
    }
});

/* Passing Express app into routes folder */

Routes(app); /* wait till routes are defined until we define Routes. */

/* Listening for connections */

app.listen(PORT, (error) => {
    if(error) {
        console.error('Could not start server', error);
    } else {
        console.log('Server successfully found!' .yellow);
    }
});
