'use strict';
const util                = require('util');
const EventEmitter        = require('events');
const BluetoothSerialPort = require('bindings')('BluetoothSerialPort.node');

/**
 * [Bluetooth description]
 */
function Bluetooth(){
  EventEmitter.call(this);
};

/**
 * [function description]
 * @return {[type]} [description]
 */
function Connection(address, port){
  EventEmitter.call(this);
  this.address = address;
  this.port = port;
};
/**
 * [write description]
 * @param  {[type]}   data     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Connection.prototype.write = function(data, callback){
  this.port.write(data, this.address, callback);
  return this;
};
/**
 * [close description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Connection.prototype.close = function(callback){
  this.port.close(callback);
  return this;
};

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

/**
 * [inherits]
 */
Bluetooth            = inherits(Bluetooth                    , EventEmitter);
Bluetooth.Connection = inherits(Connection                   , EventEmitter);
Bluetooth.DeviceINQ  = inherits(BluetoothSerialPort.DeviceINQ, EventEmitter);

/**
 * [connect description]
 * @param  {[type]}   address  [description]
 * @param  {[type]}   channel  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Bluetooth.connect = function connect(address, channel, callback){
  var port = new BluetoothSerialPort.BTSerialPortBinding(address, channel, function(){
    callback(null, new Bluetooth.Connection(address, port));
  }, callback);
};

/**
 * [exports description]
 * @type {[type]}
 */
module.exports = Bluetooth;
