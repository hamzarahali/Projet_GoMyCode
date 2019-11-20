const mongoose = require("mongoose");
//connecting to mongodb
mongoose
  .connect("mongodb://localhost:27017/GoMyCode", {
    useNewUrlParser: true
  })
  .then(
    () => {
      console.log("connected to mongodb");
    },
    err => {
      console.log("not connected problem !!!!!");
    }
  );
