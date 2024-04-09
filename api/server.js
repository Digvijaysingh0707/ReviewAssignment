const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB =require("./db.js");
const appRoute = require("./routes/appRoutes.js");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
connectDB();
app.listen(port, () => console.log(`Listening on port ${port}`));
appRoute.initialize(app);
