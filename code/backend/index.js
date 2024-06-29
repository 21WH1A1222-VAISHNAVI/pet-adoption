/*const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
require('dotenv').config();
const connection = require("./config/connect");

const app = express();
dotenv.config();

////////////////////////CONNECTION///////////////////////
connection();
const PORT = 5000;

///////////////////MIDDLEWARES//////////////////////////
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

////////////////////ROUTES//////////////////////////////
app.use("/api/admin", require("./routers/adminRoutes"))
app.use("/api/user", require("./routers/userRoutes"))

app.listen(PORT, () => console.log(`running on ${PORT}`));*/

const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connection = require("./config/connect");

const app = express();
dotenv.config();

////////////////////////CONNECTION///////////////////////
connection();

const PORT = 8001;

///////////////////MIDDLEWARES//////////////////////////
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

////////////////////ROUTES//////////////////////////////
app.use("/api/admin", require("./routers/adminRoutes"));
app.use("/api/user", require("./routers/userRoutes"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

