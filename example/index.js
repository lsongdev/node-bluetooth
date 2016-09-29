const bluetooth = require('../');

// create bluetooth device instance
const device = new bluetooth.DeviceINQ();

var list = [];

device
.on('finished',  console.log.bind(console, 'finished'))
.on('found', function found(address, name){
  
  console.log('Found: ' + address + ' with name ' + name);
  
  // find serial port channel
  device.findSerialPortChannel(dev.address, function(channel){
    console.log('Found RFCOMM channel for serial port on %s: ', dev.name, channel);
    
    // make bluetooth connect to remote device
    bluetooth.connect(dev.address, channel, function(connection){
      connection.write(new Buffer('Hello!', 'utf-8'));
    });
    
  });
  
}).inquire();
