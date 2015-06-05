var fs = require('fs');
var csvFile = fs.readFileSync("friend_list.csv","utf8");
var csv_data = []; 

var csvParse = function(csvFile){
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

console.log(csvParse(csvFile));
