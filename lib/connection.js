const EventEmitter = require('events');

/**
 * [function description]
 * @return {[type]} [description]
 */
class Connection extends EventEmitter {
  constructor(port, address) {
    const self = this;
    this.port = port;
    this.address = address;
    this.buffer = Buffer.alloc(0);
    const read = function () {
      process.nextTick(function () {
        if (self.isOpen()) {
          self.port.read(function (err, chunk) {
            if (err) return self.emit('error', err);
            if (self.delimiter) {
              let data = Buffer.concat([self.buffer, chunk]);
              let position;
              while ((position = data.indexOf(self.delimiter)) !== -1) {
                self.emit('data', data.slice(0, position));
                data = data.slice(position + self.delimiter.length);
              }
              self.buffer = data;
            } else {
              self.emit('data', chunk);
            }
            read();
          });
        }
      });
    }
    read();
  }
  /**
   * [write description]
   * @param  {[type]}   data     [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  write(data, callback){
    this.port.write(data, this.address, callback);
    return this;
  }
  /**
   * [close description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  close(){
    try {
      this.port.close(this.address);
      this.port = undefined;
      callback && callback();
    } catch (e) {
      callback && callback(e);
    }
    return this;
  }
  isOpen(){
    return this.port !== undefined;
  }
}


module.exports = Connection;