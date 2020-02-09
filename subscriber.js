var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://192.168.43.209");
client.on("connect", function () {
    console.log("connected");
    client.subscribe("temp");
    client.subscribe("humidity");
});

const app = require("express")();
const http = require("http").createServer(app);

app.get("/", (req, res) => {
    res.send("Node Server is running. Yay!!");
});

//Socket Logic
const socketio = require("socket.io")(http);

socketio.on("connection", userSocket => {
    console.log("user connected");
    // userSocket.on("send_message", (data) => {
    //     userSocket.broadcast.emit("receive_message", data)
    // })
});

http.listen(8080);

client.on("message", function (topic, message) {
    console.log(topic);
    context = message.toString();
    socketio.emit(topic, context);
    if (topic == "temp") {
        console.log(`${new Date()} Temperature is : ${context} \u00B0C`);
        
    } else { console.log(`${new Date()} Humidity is : ${context} `); }
    
});

// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 8080 });

// wss.on('connection', function connection(ws,req) {
   
//     const ip = req.connection.remoteAddress;
//     console.log("user conncted",ip)
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//     ws.send(message);
//   });

//   ws.send('something');
// });