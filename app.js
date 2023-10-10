const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/NoteRoutes"); // Update the path to your routes accordingly
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const DB_URL =
  "mongodb+srv://Gourav:1234@cluster0.0cpp0eu.mongodb.net/<your-database-name>?retryWrites=true&w=majority";

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the MongoDB Atlas server");
  })
  .catch((err) => {
    console.error("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

// Route handling for notes
app.use("/api", noteRoutes);

app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
