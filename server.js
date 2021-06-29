var port = process.env.PORT || 666;
var debug = true;
var faye = require("faye");
var { WebSocket } = require("faye-websocket");
var express = require("express");
const path = require("path");
const app = express();
var ws = require("express-ws")(app);
const https = require("https");
const fs = require('fs');

// const options = {
//   key: fs.readFileSync('ssl/jailbreak.tenzin.wtf+3-key.pem'),
//   cert: fs.readFileSync('ssl/jailbreak.tenzin.wtf+3.pem')
// };

const server = https.createServer(app)
// const socket = require("socket.io");
// const io = socket(server);

app.use(express.static("./source"))

app.get("/", (req, res) => {
	res.send("hi")
})

server.listen(port, () => {
	console.log("[SERVER] listening on *:" + port);
});



var ws = new WebSocketServer({ 
	server: server
});

ws.on("message", (msg) => {
	console.log("[MESSAGE] ", msg)
	switch(msg) {
		case "exploit_start": {
			socket.send("Recieved.")
			console.log(
				"[EXPLOIT] Exploit has been started. (" + data.userAgent + ")"
			);
			console.log("[EXPLOIT] Supporting iOS " + data.exploitVersion);
		} break;

		case "log_normal": {
			socket.send("Recieved.")
			console.log("[EXPLOIT] " + data);
		} break;

		case "error": {
			socket.send("Recieved.")
			console.log("[ERROR] " + data);  
		} break;
	}
})

ws.on('close', function(event) {
	console.log('close', event.code, event.reason);
	ws = null;
});
