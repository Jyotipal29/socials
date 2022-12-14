const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/db");
const errorHandler = require("./middleware/error");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/post");
const saveRouter = require("./routes/save");
connectDB();
const app = express();
app.use(cors());

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/save", saveRouter);
app.use(errorHandler);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`listening on post ${port}`));
