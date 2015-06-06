var fs = require("fs");
var ejs = require("ejs");
var tumblr = require("tumblr.js");

// Authenticate via OAuth
var client = tumblr.createClient({
  consumer_key: 'C1E1cyo3hX8PPO4AD6uehGVcEMwe9jsHCRLHnYbJJ6m7XwniRR',
  consumer_secret: 'mAbkoVX0ZsJu4ri6CtO7O04xQen5HS1tN7IvLJWEZTCft5ssf2',
  token: 'PFZhU4vwriHPNeYpDaFHuEwER9YtNi3G54prT2JdaxbMlyKma8',
  token_secret: 'C7TVRP5jwNwKSIxLVUrwhi7xITzIsvigDTSZVQ0nDsRRP8ZPgP'
});


var csvFile = fs.readFileSync("friend_list.csv","utf8");
var emailTemplate = fs.readFileSync('email_template.html', 'utf-8');

var csvParse = function(csvFile){
	var csv_data = []; 
 //splitting the csvFile by line
 var csvFileArray = csvFile.split("\n");
//save the first line of the csv into an the header Array
var header = csvFileArray.shift().split(",");

 //Loop through the friend's data
 for (var i = 0 ; i < csvFileArray.length; i++) {
 	var friendArray = csvFileArray[i].split(",");
 	var friend = {};
 	//Loop through the headers
 	for(var j = 0; j < header.length; j++){
 		friend[header[j]] = friendArray[j];
 	}
 	csv_data.push(friend);
 }
 return csv_data;
};

//console.log(csvParse(csvFile));

var emailCreator = function(csvFile, emailTemplate){
	var content = csvParse(csvFile); 
	content.forEach(function(friend){
		var personalizedEmail = "";
		var customizedTemplate = ejs.render(emailTemplate, 
			{ firstName: friend["firstName"],  
			numMonthsSinceContact: friend["numMonthsSinceContact"]
		});
			console.log(customizedTemplate);
	})
};

emailCreator(csvFile, emailTemplate);


// Make the request
client.userInfo(function (err, data) {
    // ...
});

client.posts("yvesyuen.tumblr.com",function(err,blog){
	console.log(blog);
})

