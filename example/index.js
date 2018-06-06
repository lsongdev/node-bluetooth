const bluetooth = require('../');

// create bluetooth device instance
const device = new bluetooth.DeviceINQ();

device
.on('finished', console.log.bind(console, 'finished'))
.on('found', function found(address, name){

  console.log('Found: ' + address + ' with name ' + name);

  // find serial port channel
  device.findSerialPortChannel(address, function(channel){
    console.log('Found RFCOMM channel for serial port on %s: ', name, channel);

    // make bluetooth connect to remote device
    bluetooth.connect(address, channel, function(err, connection){
      if(err) return console.error(err);

      connection.delimiter = Buffer.from('\n', 'utf8');
      connection.on('data', (buffer) => {
        console.log('received message:', buffer.toString());
      });

      connection.write(new Buffer('Hello!', 'utf-8'), () => {
        console.log('wrote');
      });
    });

  });

})

device.scan();
