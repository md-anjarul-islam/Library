const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const indexRouter = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/", indexRouter);
app.use("*", (req, res) => {
  res.status(400).json({ message: "Bad Request." });
});

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("The Server is running..."));
