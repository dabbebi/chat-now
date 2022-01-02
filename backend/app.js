const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const trimmer = require('express-trimmer');
dotenv.config({ path: '.env' })
const in_routes = require("./routes/in.routes");
const out_routes = require("./routes/out.routes");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});





app.use(trimmer);

const db = require("./models");
const dbConfig = require("./config/db.config");
db.mongoose
  .connect(`mongodb+srv://${dbConfig.user}:${dbConfig.pwd}@${dbConfig.domain}/${dbConfig.DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

db.mongoose.set('useCreateIndex', true);

//Home Page
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

//Routes
//app.use('/uploads', express.static(path.join(__dirname, "/uploads")));
app.use("/in", in_routes);
app.use("/out", out_routes);


module.exports = app;