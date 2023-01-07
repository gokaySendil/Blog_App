const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
const dotenv = require("dotenv").config(); // Allow us to have dotenv file with variables in it
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const port = process.env.PORT || 8000; // Server to run on

const app = express();
app.use(cors());
app.use(express.json()); // To get body data we use express.json(); it parses the req body
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", userRoutes);
app.use(errorHandler);
connectDB().then(
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  })
);
