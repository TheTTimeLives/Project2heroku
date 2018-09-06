const express = require('express');
const bp = require('body-parser');
const hb = require('express-handlebars');
const path = require('path');



var app = express();
var PORT = process.env.PORT || 5000;

app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
app.use(express.static(__dirname + '/public'));
// app.use(express.static("public"));

app.engine('handlebars', hb({defaultLayout: 'main'}));
app.set("view engine", "handlebars");

var db = require("./models");

require('./controller/routes/htmlroutes.js')(app);
require('./controller/routes/apiroutes.js')(app);




db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function (){
        console.log(`App listening on PORT: ${PORT}`);
    })
  });
  
//   app.listen(PORT, function (){
//     console.log(`App listening on PORT: ${PORT}`);
// })


//Basic express server