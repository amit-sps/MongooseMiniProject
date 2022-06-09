const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/minproject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Database Connected!"))
  .catch((err) => console.log(err));
