## node-bluetooth ![NPM version](https://img.shields.io/npm/v/node-bluetooth.svg?style=flat)

Bluetooth serial port communication for Node.js


### Requirements

**This package require `node-gyp` installed .**

#### Linux

You'll need libbluetooth-dev. On Ubuntu/Debian : ``` $ sudo apt-get install libbluetooth-dev```

### Installation

```bash
$ npm install node-bluetooth --save
```

### Example

#### create device
```js
const bluetooth = require('node-bluetooth');

// create bluetooth device instance
const device = new bluetooth.DeviceINQ();
```

#### list already paired devices
```js
device.listPairedDevices(console.log);
```
will output
```js
➜  node-bluetooth git:(master) ✗ node example/index.js
[ { name: 'Lsong’s Trackpad',
    address: 'd0-a6-37-f1-e7-87',
    services: [ [Object], [Object] ] },
  { name: 'Lsong’s iPhone',
    address: 'dc-2b-2a-82-76-29',
    services: [ [Object], [Object], [Object], [Object] ] },
  { name: 'Lsong’s Keyboard',
    address: '60-c5-47-19-d3-76',
    services: [ [Object], [Object] ] } ]
```


#### find devices

```js
device
.on('finished',  console.log.bind(console, 'finished'))
.on('found', function found(address, name){
  console.log('Found: ' + address + ' with name ' + name);
}).scan();
```

will output

```
➜  node-bluetooth git:(master) ✗ node example/index.js
Found: 22-22-a3-0d-63-09 with name Meizu MX4 Pro
Found: dc-2b-2a-82-76-29 with name Lsong's iPhone
Found: 38-bc-1a-37-2d-d4 with name MEIZU MX5
finished
```

find serial port channel

```js
device.findSerialPortChannel(address, function(channel){
  console.log('Found RFCOMM channel for serial port on %s: ', name, channel);

  // make bluetooth connect to remote device
  bluetooth.connect(address, channel, function(err, connection){
    if(err) return console.error(err);
    connection.write(new Buffer('Hello!', 'utf-8'), () => {
      console.log("wrote");
    });
  });

});
```

create connection to device, read and write

```js
// make bluetooth connect to remote device
bluetooth.connect(address, channel, function(err, connection){
  if(err) return console.error(err);

  connection.on('data', (buffer) => {
    console.log('received message:', buffer.toString());
  });

  connection.write(new Buffer('Hello!', 'utf-8'), () => {
    console.log("wrote");
  });
});
```

### API

- [bluetooth.Connection](#Connection)
- [bluetooth.DeviceINQ](#DeviceINQ)
- [bluetooth.connect](#connect)

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT license
Copyright (c) 2016 lsong

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
