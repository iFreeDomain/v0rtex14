var port = process.env.PORT || 666;
var WebSocketServer = require("ws").Server
var express = require("express");
const app = express();
var ws = require("express-ws")(app);
const https = require("https");

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



var wss = new WebSocketServer({ 
	server: server
});

wss.on("connection", function(ws) {
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
})