const mongoose = require("mongoose");
var BearSchema = new mongoose.Schema({
    name: {type: String, required: true}
}, {timestamps: true});
mongoose.model("Bear", BearSchema);