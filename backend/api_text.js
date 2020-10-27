var http = require("https");

var checkIndate = '2020-10-08';
var checkOutdate = '2020-12-08';
var options = {
	"method": "GET",
	"hostname": "hotels4.p.rapidapi.com",
	"port": null,
	"path": "/properties/list?currency=USD&locale=en_US&sortOrder=PRICE&destinationId=1506246&pageNumber=1&checkIn=" + checkIndate + "&checkOut=" + checkOutdate + "&pageSize=25&adults1=1",
	"headers": {
		"x-rapidapi-host": "hotels4.p.rapidapi.com",
		"x-rapidapi-key": "b4ad130532mshf2c9d05803226fcp18dbe2jsn1812227df7c1",
		"useQueryString": true
	}
};

var req = http.request(options, function (res) {
	var chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		var body = Buffer.concat(chunks);
		console.log(body.toString());
		
		//send the data in json file
		var fs = require('fs');

		fs.writeFile('hotelDetails.json', body.toString(), function (err) {
			if (err) throw err;
			console.log('Saved!');
		});
	});
});

req.end();