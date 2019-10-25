var express = require("express");
var proxy = require("http-proxy-middleware");

var app = express();

app.use(express.static('./build'));  // create a static link for build folder created by react-create-app

app.use("/api", proxy({ target: "http://localhost:8000", changeOrigin: true }));

app.get("*", function(req, res) {
    res.sendFile("./build/index.html");
});

app.listen(4000);
