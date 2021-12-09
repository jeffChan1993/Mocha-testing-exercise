# Speer Technologies Backend assessment

Run this command to install all dependencies
<p> >> npm install</p>

Start the program by this command, system will auto crate the tables when your database config is correct
<p> >> node index.js </p>


** Mocha **
<p>* Please make sure that you are in /test directory*</p>
<p>* Please make sure that you stop the node js program before run below command*</p>
If your want to test the user api
<p> >> mocha user.test.js </p>

If your want to test the chat api
<p> >> mocha chat.test.js </p>

If your want to test the tweet api
<p> >> mocha tweet.test.js </p>

** Like / unlike / retweet **
<p>I should add the below checkings</p>

- like
<p> >> if people unliked the tweet, when they like the tweet again, it should remove the old unliked record</p>
<p> >> each people can only like the tweet once</p>

- unlike
<p> >> if people liked the tweet, when they unlike the tweet again, it should remove the old liked record </p>
<p> >> each people can only unlike the tweet once </p>

- retweet
<p> >> each people can only retweet the tweet once </p>


<p>when you want to use the seesion data, you can change both "req.body.id" to "req.session.user.id" when you logged in the account</p>

<p> If you want to re-create both tables when starting server, you can set true with below function
<p> >> db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});</p>
Sequelize ORM 
<p>https://sequelize.org/v5/</p>
