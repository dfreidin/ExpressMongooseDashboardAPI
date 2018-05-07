const mongoose = require("mongoose");
const Bear = mongoose.model("Bear");
module.exports = {
    index: function(req, res) {
        Bear.find({}, function(err, bears){
            if(err) {
                res.json({message: "Error", error: err});
            }
            else {
                res.json({message: "Success", data: bears});
            }
        });
    },
    create: function(req, res) {
        Bear.create(req.body, function(err, bear){
            if(err) {
                res.json({message: "Error", error: err});
            }
            else {
                res.redirect("/bears/"+bear.id);
            }
        });
    },
    update: function(req, res) {
        Bear.findById(req.params.id, function(err, bear){
            if(err) {
                res.json({message: "Error", error: err});
            }
            else {
                bear.set(req.body);
                bear.save(function(err){
                    if(err) {
                        res.json({message: "Error", error: err});
                    }
                    else {
                        res.redirect("/bears/"+bear.id);
                    }
                });
            }
        });
    },
    destroy: function(req, res) {
        Bear.remove({_id: req.params.id}, function(err){
            if(err) {
                res.json({message: "Error", error: err});
            }
            else {
                res.redirect("/bears");
            }
        });
    },
    show: function(req, res) {
        Bear.findById(req.params.id, function(err, bear){
            if(err) {
                res.json({message: "Error", error: err});
            }
            else {
                res.json({message: "Success", data: bear});
            }
        });
    }
}