var fs = require("fs");
var ejs = require("ejs");
var tumblr = require("tumblr.js");

var mandrill = require("mandrill-api/mandrill");
var mandrill_client = new mandrill.Mandrill("EeTbWeeBVFE5nnuTU7Za4w");

var csvFile = fs.readFileSync("friend_list.csv","utf8");
var emailTemplate = fs.readFileSync('email_template.html', 'utf-8');

var client = tumblr.createClient({
	consumer_key: 'C1E1cyo3hX8PPO4AD6uehGVcEMwe9jsHCRLHnYbJJ6m7XwniRR',
	consumer_secret: 'mAbkoVX0ZsJu4ri6CtO7O04xQen5HS1tN7IvLJWEZTCft5ssf2',
	token: 'PFZhU4vwriHPNeYpDaFHuEwER9YtNi3G54prT2JdaxbMlyKma8',
	token_secret: 'C7TVRP5jwNwKSIxLVUrwhi7xITzIsvigDTSZVQ0nDsRRP8ZPgP'
});

	//Parser
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

	//email function
	function sendEmail(to_name, to_email, from_name, from_email, subject, message_html){
		var message = {
			"html": message_html,
			"subject": subject,
			"from_email": from_email,
			"from_name": from_name,
			"to": [{
				"email": to_email,
				"name": to_name
			}],
			"important": false,
			"track_opens": true,    
			"auto_html": false,
			"preserve_recipients": true,
			"merge": false,
			"tags": [
			"Fullstack_Tumblrmailer_Workshop"
			]    
		};
		var async = false;
		var ip_pool = "Main Pool";
		mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        // console.log(message);
        // console.log(result);   
      }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
      });
	}


	client.posts("yvesyuen.tumblr.com",function(err,blog){	



	//get posts
	var latestPosts = []; 
	var today = new Date();
	var MS_PER_DAY = 1000 * 60 * 60 * 24; 

	blog["posts"].forEach(function(post){
		postDate = new Date(post["date"]);
		var dateDiff = (today - postDate) / MS_PER_DAY;

		if(dateDiff < 7) {
			var latestPost = {
				title : post["title"],
				href : post["post_url"]
			};
			latestPosts.push(latestPost);
		}
	});

	//Email Creator
	var emailCreator = function(csvFile, emailTemplate){
		var content = csvParse(csvFile); 
		content.forEach(function(friend){
			var personalizedEmail = "";
			var customizedTemplate = ejs.render(emailTemplate, 
				{ firstName: friend["firstName"],  
				numMonthsSinceContact: friend["numMonthsSinceContact"],
				latestPosts: latestPosts
			});
			sendEmail(friend.firstName, friend.emailAddress, "Yves Y", "yves.j.yuen@gmail.com", "test", customizedTemplate);
		})
	};

	emailCreator(csvFile, emailTemplate);
});





