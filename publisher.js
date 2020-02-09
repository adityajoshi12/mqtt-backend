var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.43.209');
var data = {
    "temp": 59,
    "humidity": 79
}
client.on('connect', function () {
    setInterval(function () {
        client.publish('temp', JSON.stringify(data));
        console.log('Message Sent');
    }, 5000);
});