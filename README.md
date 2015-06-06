# Tumblr-Mailer

<h2> OBJECTIVES </h2>

Using the Tumblr blog you created in Part 1, you will create a node.js script file that will email a list of contacts your most recent blog posts.

<h2> CONCEPTS </h2>

This is your first project in Node where you will be using various libraries to accomplish your goals. When learning a new library, there is always a learning curve.

This is a typical cycle of exploring a new API:

<ul>
	<li>play with the syntax</li>
	<li>assume that something is messed up</li>
	<li>read the documentation and see why the developer built it a certain way</li>
	<li>assume that something is messed up</li>
	<li>read the source code and realize that the developer was actually right all along</li>
	<li>It can frustrating to use new libraries but don't worry - you will get through it! </li>
	</ul>

<h2> OVERVIEW </h2>
Here's a high-level overview of tasks we'll be accomplishing:
<ul>
	<li>Create another JavaScript file that can pull data from your Tumblr Blog </li>
	<li>Read in a CSV file of your friends' emails</li>
	<li>Load the content from some time-period of posts from your Tumblr blog</li>
	<li>Populate an email template with your blog content and mail merge it with your friends data</li>
	<li>Send the email using the Mandrill API</li>
	<li>By the end of the project, you should be able to run a JavaScript file that will send out an email newsletter to a list of friends and family in your CSV file.</li>
</ul>