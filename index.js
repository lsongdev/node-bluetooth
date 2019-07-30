'use strict';
const EventEmitter = require('events');
const BluetoothSerialPort = require('bindings')('BluetoothSerialPort.node');

/**
 * [Bluetooth description]
 */
class Bluetooth extends EventEmitter {
  /**
   * [connect description]
   * @param  {[type]}   address  [description]
   * @param  {[type]}   channel  [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  static connect(address, channel, callback) {
    const { BTSerialPortBinding } = BluetoothSerialPort;
    const port = new BTSerialPortBinding(address, channel, function (err) {
      callback && callback(err, new Bluetooth.Connection(port, address));
    }, callback);
    return port;
  }
}

Bluetooth.DeviceINQ = require('./lib/device');
Bluetooth.Connection = require('./lib/connection');
Bluetooth.SerialPort = BluetoothSerialPort;

/**
 * [exports description]
 * @type {[type]}
 */
module.exports = Bluetooth;