var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("finalProject");

    // connect with json file
    const fs = require('fs');
    var myData = fs.readFileSync('hotelDetails.json');
    var jsonString = myData.toString();
    jsonString = jsonString.replace(/"s\./g, "\"s_");

    var allData = JSON.parse(jsonString);

    //console.log(allData);

    //Insert Data

    dbo.collection("project").insertOne(allData, function (err, res) {
        if (err) throw err;
        console.log("records inserted");
        db.close();
    });


});