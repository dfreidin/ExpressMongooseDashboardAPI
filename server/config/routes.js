const bears = require("../controllers/bears");
module.exports = function(app) {
    app.get("/bears", bears.index);
    app.get("/bears/:id", bears.show);
    app.post("/bears", bears.create);
    app.post("/bears/:id", bears.update);
    app.post("/bears/:id/delete", bears.destroy);
}