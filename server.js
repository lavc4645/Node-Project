const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
require('dotenv').config()
const port = 3003;
const dbUrl = process.env.MONGURI_URL;

app.use(bodyParser.json());

const routes = require("./src/routes/routes");
app.use(routes);

// Connect mongoDb
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDb connection error'));

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})