const http=require('http');
const mqtt=require('mqtt');
const os=require('os');
const express=require('express');
const router = express.Router();
const thingsboardHost = "demo.thingsboard.io";
const accessToken = 'yD1EeBV5HpD4IAZChR8g';

const attributesTopic = 'v1/devices/me/attributes';
const telemetryTopic = 'v1/devices/me/telemetry';
const attributesRequestTopic = 'v1/devices/me/attributes/request/1';
const attributesResponseTopic = 'v1/devices/me/attributes/response/1';

console.log('Connecting to: %s using access token: %s', thingsboardHost, accessToken);
var client = mqtt.connect('mqtt://' + thingsboardHost, {username: accessToken});

//const test='v1/devices/me/attributes/response/3e85b630-28a4-11eb-85ee-f936949cce2a';
var array=[];

var i=0;
var appState,R1,R2;
var statusDevice='';
// Telemetry upload is once per 5 seconds by default;

var currentFrequency =2;

//
var uploadInterval;
var appState,R1,R2;
// Triggers when client is successfully connected to the Thingsboard server


client.on('connect', function () {
    console.log('Client connected!');
    // Upload firmware version and serial number as device attribute using 'v1/devices/me/attributes' MQTT topic

    client.subscribe(attributesTopic);
    client.publish(attributesRequestTopic, JSON.stringify({
      'clientKeys':'R1',
     'sharedKeys':'false'
    }));

   client.publish(attributesRequestTopic, JSON.stringify({
    'clientKeys':'R2',
   'sharedKeys':'false'
    }));
    client.publish(attributesRequestTopic, JSON.stringify({
        'clientKeys':'R3',
       'sharedKeys':'false'
    }));
    client.publish(attributesRequestTopic, JSON.stringify({
        'clientKeys':'R4',
        'sharedKeys':'false'
    }));
    client.publish(attributesRequestTopic, JSON.stringify({
      'clientKeys':'R5',
      'sharedKeys':'false'
    }));
    
    console.log('Uploading OS stats with interval %s (sec)...', currentFrequency);
    //uploadInterval = setInterval(uploadStats, currentFrequency *1000);
});

client.on('message', function (topic, message)  {
 
  if (topic === attributesTopic) {
      // Process attributes update notification
      console.log('Received attribute update notification: %s', message.toString());
      var data = JSON.parse(message);
      if (data.uploadFrequency && data.uploadFrequency != currentFrequency) {
          // Reschedule upload using new frequency
          rescheduleStatsUpload(data.uploadFrequency);
      }
      
  }
  
  
  if (topic === attributesResponseTopic ) {
      // Process response to attributes request
      var ret=message.toString().replace('{"client":{','');
      ret=ret.replace('}}','');
      console.log('Received response to attribute request: %s',ret);
      
      statusDevice+=ret;
     
  }

 
});

router.get('/',function(req,res,next){
  res.send({statusDevice});
});


//console.log('status device is %s',attributesResponseTopic.toString());

// Reschedule of stats upload timer
function rescheduleStatsUpload(uploadFrequency) {
    clearInterval(uploadInterval);
    currentFrequency = uploadFrequency;
  //  console.log('Uploading OS stats with new interval %s (sec)...', currentFrequency);
  //  uploadInterval = setInterval(uploadStats, currentFrequency * 1000);
}

// Upload OS stats using 'v1/devices/me/telemetry' MQTT topic
function uploadStats() {
    var data = {};
    data.type = os.type();
    data.uptime = os.uptime();
    data.mem = os.freemem() / os.totalmem();
     console.log('Publishing OS info & stats: %s', JSON.stringify(data));
    client.publish(telemetryTopic, JSON.stringify(data));
}



process.on('SIGINT', function () {
    console.log();
    console.log('Disconnecting...');
    client.end();
    console.log('Exited!');
    process.exit(2);
});

// Catches uncaught exceptions
process.on('uncaughtException', function (e) {
    console.log('Uncaught Exception...');
    console.log(e.stack);
    process.exit(99);
});
//


module.exports=router;
