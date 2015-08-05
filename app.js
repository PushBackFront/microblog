var fs = require("fs");
var http = require("http");
var socket = require("socket.io");

var app = http.createServer(function(req, res) {
  var html = fs.readFileSync("./app.html");
  res.writeHead(200);
  res.end(html);
});

var io = socket(app);

io.on("connection", function(client) {
  client.on("send", function(data) {
    console.log(data);
    client.emit("receive", data);
    client.broadcast.emit("receive", data);
  });
});

app.listen(3000, function() {
  console.log("Microblog rodando na porta 3000");
});