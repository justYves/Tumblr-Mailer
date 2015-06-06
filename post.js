var tumblr = require("tumblr.js");

var client = tumblr.createClient({
  consumer_key: 'C1E1cyo3hX8PPO4AD6uehGVcEMwe9jsHCRLHnYbJJ6m7XwniRR',
  consumer_secret: 'mAbkoVX0ZsJu4ri6CtO7O04xQen5HS1tN7IvLJWEZTCft5ssf2',
  token: 'PFZhU4vwriHPNeYpDaFHuEwER9YtNi3G54prT2JdaxbMlyKma8',
  token_secret: 'C7TVRP5jwNwKSIxLVUrwhi7xITzIsvigDTSZVQ0nDsRRP8ZPgP'
});

client.posts("yvesyuen.tumblr.com",function(err,blog){
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
			}
			latestPosts.push(latestPost);
		}
	})
	console.log(latestPosts);
})


