const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name: { type: String, required:true },
    email: { type: String, required:true },
    mobile: { type: String, required:true },
    DOB: { type: String, required:true }
});
module.exports = mongoose.model("users", productSchema);
