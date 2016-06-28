const bluetooth = require('../');

const device = new bluetooth.DeviceINQ();

device.on('found', function(address, name){

  console.log('Found: ' + address + ' with name ' + name);

  device.findSerialPortChannel(address, function(channel){
    
    console.log('Found RFCOMM channel for serial port on %s: ', name, channel);
    
    // bluetooth.connect(address, channel, function(err, connection){
    //   connection.write('hi');
    // });
  });
});

device.on('finished', function(){
  console.log('scan finished.');
});

device.listPairedDevices(function(devices){
  console.log(devices);
});

device.inquire();
