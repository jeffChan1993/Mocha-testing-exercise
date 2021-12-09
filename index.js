const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const port = 3000;

const db = require("./models");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "", // yout secret
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
require("./routes/user")(app);
require("./routes/chat")(app);
require("./routes/tweet")(app);


// if you want to re-create the table when restart the server, set force be true
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

module.exports = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
