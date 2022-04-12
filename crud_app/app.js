const express = require("express");
const mongoose = require("mongoose"); //required for database connection
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const path = require("path");
require("express-async-errors");

const app = express();
const isAuth = require("./middlewares/is-auth");
const catchUnhandleExceptions = require("./middlewares/exception-handling");
const Userdb = require("./model/registers");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const havePermission = require("./middlewares/have-permissions");

const port = process.env.PORT || 8080; //server port
//Database connection
db_URL = "mongodb+srv://mongo:admin@cluster0.mdt1w.mongodb.net/Gamer_Management_Database?retryWrites=true&w=majority";

mongoose.connect(
  db_URL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  function () {
    try {
      if (mongoose.connection.readyState == 1) {
        console.log("Successfully connected to the database");
      } else {
        console.log("Unable to connect to the database");
      }
    } catch (err) {
      console.log("some error while connecting to mongodb ...");
      throw err;
    }
  }
);
//End of database connection
const store = new MongoDBSession({
  uri: db_URL,
  collection: "app_sessions",
});

app.use(
  session({
    secret: "should-be-long-secret-key-in-prod-env",
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/css", express.static(path.resolve(__dirname, "public/css")));
app.use("/js", express.static(path.resolve(__dirname, "public/js")));

app.set("view engine", "ejs");
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

//Rendering all pages
app.get("/", (req, res) => {
  res.redirect("/welcome");
});

app.get("/welcome", isAuth, (req, res) => {
  res.render("welcome_user");
});

app.use(catchUnhandleExceptions);

//Server port
app.listen(port, () => {
  console.log(`server running at port http://localhost:${port}`);
});
