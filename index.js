require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 4500;

app.use(cors());

const taskRouter = require("./routes/taskRouter");

const notFound = require("./middlewares/notFound");

app.use(express.json()); // this allows access to the request.body in our app

app.use("/api/task", taskRouter);

app.use(notFound);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected!");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Unable to Connect");
  }
};

start();
