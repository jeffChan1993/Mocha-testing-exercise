# Mocha testing exercise


Run this command to install all dependencies
<pre>npm install</pre>

Start the program by this command, system will auto crate the tables when your database config is correct
<pre>node index.js</pre>


** Mocha **
<p>* It is my first time to write the unit test , If you found any problem, please tell me :)<p>
<p>* Please make sure that you are in /test directory*</p>
<p>* Please make sure that you stop the node js server before run below command*</p>
If your want to test the user api
<pre>mocha user.test.js </pre>

If your want to test the chat api
<pre>mocha chat.test.js </pre>

If your want to test the tweet api
<pre>mocha tweet.test.js </pre>


<p> If you want to re-create both tables when starting server, you can set true with below function</p>
<p> If you testing the api by mocha, please set false with below function</p>
<p> >> db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});</p>
Sequelize ORM 
<p>https://sequelize.org/v5/</p>
