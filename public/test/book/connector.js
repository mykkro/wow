var bookman_connector = {}

// test code for postMessage
window.addEventListener("message", receiveMessage, false);

// message handler
function receiveMessage(event)
{
  	console.log("Incoming message from: " + event.origin)
  if (event.origin !== "http://localhost:9999")
    return;

  	console.log("Child window received a message: ", event.data)

  	// signal back to partent...
  	window.parent.postMessage("Response from child page", "*");
}