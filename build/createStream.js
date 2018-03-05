const Writable = require('stream').Writable
const util = require('util')

module.exports = FileStream
util.inherits(FileStream, Writable)

function FileStream (options) {
  Writable.call(this, options)
}

FileStream.prototype._write = (chunk, encoding, cb) => {
  const data =  chunk.toString()
  cb(data)
}