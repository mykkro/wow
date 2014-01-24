var WowServer = require("./server")
WowServer.start()

var baseURL = "http://localhost:" + WowServer.port + "/";
console.log("Go to: "+baseURL)
