var fs = require("fs");
var http = require("http");
var socket = require("socket.io");

var app = http.createServer(function(req, res) {
  fs.readFile("./app.html", function(err, html) {
    res.writeHead(200);
    res.end(html);
  });
});

var io = socket(app);

var history = [];

io.on("connection", function(client) {
  history.forEach(function(data) {
    client.emit("receive", data);
  });
  client.on("send", function(data) {
    console.log(data);
    history.push(data);
    client.emit("receive", data);
    client.broadcast.emit("receive", data);
  });
});

app.listen(3000, function() {
  console.log("Microblog rodando na porta 3000");
});