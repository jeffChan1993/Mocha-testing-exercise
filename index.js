const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000

const db = require("./models");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/user")(app);
require("./routes/chat")(app);
require("./routes/tweet")(app);
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


// if you want to re-create the table when restart the server, set force be true
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

module.exports = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
