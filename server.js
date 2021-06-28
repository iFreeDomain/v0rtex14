var port = process.env.PORT || 666;
var debug = true;

var express = require("express");
const path = require("path");
const app = express();
const https = require("https");
const fs = require('fs');

// const options = {
//   key: fs.readFileSync('ssl/jailbreak.tenzin.wtf+3-key.pem'),
//   cert: fs.readFileSync('ssl/jailbreak.tenzin.wtf+3.pem')
// };

const server = https.createServer(app);
const socket = require("socket.io");
const io = socket(server);



app.use(express.static("./source"))

app.get("/", (req, res) => {
	res.send("hi")
})

server.listen(port, () => {
	console.log("[SERVER] listening on *:" + port);
});

io.on("connection", (socket) => {
	socket.on("exploit_start", function (data) {
		socket.send("Recieved.")
		console.log(
			"[EXPLOIT] Exploit has been started. (" + data.userAgent + ")"
		);
		console.log("[EXPLOIT] Supporting iOS " + data.exploitVersion);
	});

	socket.on("log_normal", function (data) {
		socket.send("Recieved.")
		console.log("[EXPLOIT] " + data);
	});

    socket.on("error", function(data){
		socket.send("Recieved.")
        console.log("[ERROR] " + data);
    });

	if (debug === true)
		console.log("[CLIENT] New client connection... (" + socket.id + ")");
});
