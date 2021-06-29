import "./App.css";
import kickstart145 from "./exploits/14.5";
import kickstart146 from "./exploits/14.6";
import socket from "socket.io";


var currentFirmware = function (userAgent) {
	return userAgent.match(/\OS (.*?)\ like/)[1].replaceAll("_", ".");
};

async function pwnMe() {
	if (window.location.protocol != "https:") {
		document.getElementById("jbButton").disabled = true;
		if (navigator.userAgent.includes("Mac OS X")) {
			alert("MacOS is not supported");
		} else if (currentFirmware(navigator.userAgent).startsWith("14.5")) {
			socket.send("log_normal", "Starting exploitation for iOS 14.5");
			await kickstart145();
		} else if (currentFirmware(navigator.userAgent).startsWith("14.6")) {
			socket.send("log_normal", "Starting exploitation for iOS 14.6");
			await kickstart146();
		} else {
			socket.send("error", "Detected a unsupported version/device");
		}
	}else{
        alert("exploitation only works over https");
    }
}

const appHeight = () => {
	const doc = document.documentElement;
	doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};

window.addEventListener("resize", appHeight);
appHeight();

function App() {
  return (
    <div>
      <button id="jbButton" className="exploitButton" onClick={pwnMe()}>
        Jailbreak
      </button>
      <div id="page-wrap" style={{display: "none"}}>
        <div id="well">
          <h2>
            <strong id="slider"></strong>
            <span>slide to jailbreak</span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default App;
