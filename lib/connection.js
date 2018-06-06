const EventEmitter = require('events');

/**
 * [function description]
 * @return {[type]} [description]
 */
class Connection extends EventEmitter {
  constructor(port, address) {
    super();
    this.port = port;
    this.address = address;
    const self = this;
    (function read(){
      self.isOpen() && self.port.read((err, chunk) => {
        process.nextTick(read);
        if(err) return self.emit('error', err);
        self.emit('data', chunk);
      });
    })();
  }
  isOpen(){
    return this.port !== undefined;
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
  close(callback){
    try {
      this.port.close(this.address);
      this.port = undefined;
      callback && callback();
    } catch (e) {
      callback && callback(e);
    }
    return this;
  }
}


module.exports = Connection;