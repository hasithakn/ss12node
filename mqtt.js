var mqtt = require('mqtt');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('ss12test', 'root', 'hasitha', {
    host: 'localhost',
    dialect: 'mysql'
});
var options = {
    clientId: 'abcd1234'
};
// client = mqtt.connect('mqtt://broker.hivemq.com:1883', options);
client = mqtt.connect('mqtt://localhost:1883', options);
client.on('connect', function () {
    if (client.connected) {
        console.log('mqtt device connected');
    }
});
client.subscribe("ss12-tech");
client.on('close', function () {
    console.log('mqtt device closed');
});
client.on('message', function (topic, message) {
    console.log(message.toString());

    var jsonData = JSON.parse(message);

    var timeStamp = Date.now();
    var temp = jsonData.temp;
    var humid = jsonData.humid;
    var foodStatus = jsonData.foodStatus;
    var compartment_id = jsonData.compartment_id;

    sequelize.query("INSERT INTO devicedata (time_stamp,temp,humid,food_status,compartment_id) VALUES (" + timeStamp + ", " + temp + ", " + humid + "," + foodStatus + ",\"" + compartment_id + "\" )", function (err) {
        if (err) {
            console.log("error");
        } else {
            console.log('succes');
            // res.json(201, {response: {code: 201, message: 'Video has been added'}});
        }
    });
});


this.getClient = function () {
    return client;
};
