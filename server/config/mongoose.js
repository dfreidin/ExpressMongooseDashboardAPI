const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
mongoose.connect("mongodb://localhost/async_bear_dashboard");
var models_path = path.join(__dirname, "../models");
fs.readdirSync(models_path).forEach(function(file){
    if(file.indexOf(".js") >= 0) {
        require(models_path + "/" + file);
    }
});