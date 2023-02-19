const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const DB =
  "mongodb+srv://vasugoel17:Vasu%40123@cluster0.7vnjhef.mongodb.net/signUp?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection start"))
  .catch((err) => console.log(err.message));
