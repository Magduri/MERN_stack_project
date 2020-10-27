const express = require('express')
//this is a middleware which gives express to read FROM data
const bodyParser = require('body-parser')
const app = express()
var http = require("https");
const port = 5000;

//connect to mongodb
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/getData', (req, response) => {

    var cityFilter = 'New York';
    var hotelnames = [];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("finalProject");
        dbo.collection("project").findOne({}, function (err, result) {
            var allHotels = result.data.body.searchResults.results;

            var hotels = allHotels.filter(function (item) {
                return item.address.locality == cityFilter;
            });

            hotels.forEach((hotel) => {
                hotelnames.push(hotel.name);
            });


            db.close();
            response.send(hotelnames);

        });
        // req.end();  

    });

});

// app.get('/getPrice/:name', (rreq, response) => {
//     var cityFilter = 'New York';
//     var hotelFilter = rreq.params.name;
//     var hotelFilter = 'Chelsea Inn';
//     console.log(req);

//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("finalProject");
//         dbo.collection("project").findOne({}, function (err, result) {
//             var allHotels = result.data.body.searchResults.results;

//             var hotels = allHotels.filter(function (item) {
//                 return item.address.locality == cityFilter;
//             });

//             var matchHotel = hotels.filter(function (item) {
//                 return item.name == hotelFilter;
//             })
//             db.close();
//             response.send(matchHotel[0].ratePlan.price.current);
//         });
//     });

// });

app.get('/getAddress/:name', (rreq, response) => {
    var cityFilter = 'New York';
    var hotelFilter = rreq.params.name;
    
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("finalProject");
        dbo.collection("project").findOne({}, function (err, result) {
            var allHotels = result.data.body.searchResults.results;

            var hotels = allHotels.filter(function (item) {
                return item.address.locality == cityFilter;
            });

            var matchHotel = hotels.filter(function (item) {
                return item.name == hotelFilter;
            })
            db.close();
            //console.log(matchHotel[0])
           response.send(matchHotel[0]);
        });
    });

});



// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("finalProject");

//     // // connect with json file
//     // const fs = require('fs');
//     // var myData = fs.readFileSync('hotelDetails.json');
//     // var jsonString = myData.toString();
//     // jsonString = jsonString.replace(/"s\./g, "\"s_");

//     // var allData = JSON.parse(jsonString);



// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})