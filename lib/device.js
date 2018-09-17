const EventEmitter = require('events');
const { DeviceINQ } = require('bindings')('BluetoothSerialPort.node');

class Device extends inherits(DeviceINQ, EventEmitter) {
  scan(){
    const list = [];
    return new Promise((resolve, reject) => {
      this.once('error', reject);
      const found = (address, name) => {
        list.push({ address, name });
        this.emit('found', address, name);
      }
      const finish = () => {
        resolve(list);
        this.emit('finished');
      }
      return this.inquire(found, finish);
    });
  }
}

/**
 * [inherits description]
 * @param  {[type]} target [description]
 * @param  {[type]} source [description]
 * @return {[type]}        [description]
 */
function inherits(target, source) {
  var k;
  for (k in source.prototype) {
    target.prototype[k] = source.prototype[k];
  }
  return target;
}

module.exports = Device;