/// the first letter of each word of each database element is Capital Letter
const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose
  .connect("mongodb://localhost/BookShop")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error connecting DB", err));

module.exports = mongoose;
