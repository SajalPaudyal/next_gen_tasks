const express = require("express");
const dbConnect = require("./src/config/dbConnect");
const app = express();
require("dotenv").config();

const taskRoute = require('./src/api/routes/tasks.route');

const PORT = process.env.PORT;

app.use(express.json());


app.get("/", (req, res) => {
    res.send("This is a new file with Mongo and text");
});

dbConnect().then(r => console.log("DB connected"));

app.use('/api', taskRoute);


app.listen(PORT, () => {
    console.log(`Listening on port:${PORT} `);
});
