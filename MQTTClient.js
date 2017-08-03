/**
 * Created by HP on 12/14/2016.
 */
var mqtt = require('mqtt');

var options = {
    clientId: '24234efsdfx'
    //username: 'virtual',
    //password: 'virtual'
};
var client = mqtt.connect('mqtt://localhost:1883', options);
// var client = mqtt.connect('mqtt://broker.hivemq.com:1883', options);

client.on('connect', function () {
    // client.subscribe('data');
});

setInterval(function () {
    var a = {
        "timestamp": 2323,
        "temp": Math.floor((Math.random() * 100 + 1)),
        "humid":Math.floor((Math.random() * 200 + 1)),
        "foodStatus": Math.floor((Math.random() * 50 + 1)),
        "compartment_id": "ESP-03"
    };

    var as = JSON.stringify(a);
    client.publish('ss12-tech', as)
}, 1000);

client.on('message', function (topic, message) {
    console.log(message.toString());
});
