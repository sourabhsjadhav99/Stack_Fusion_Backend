let dotenv=require('dotenv').config()
const express = require("express");
const app = express();
let cors = require("cors")
require("./src/connectionAndSchema/config");
const port = process.env.PORT || 5000
const userRoutes = require("./src/routes/userRoute");
app.use(cors())
app.use("/user", userRoutes)

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;