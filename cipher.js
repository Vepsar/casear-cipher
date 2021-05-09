const { Transform } = require("stream");
const { encode, decode } = require("./encodedecode");
const fs = require("fs");
let result = "";

class Chiper extends Transform {
  constructor(text, shift, act) {
    super();
    this.text = text;
    this.shift = shift;
    this.act = act;
  }

  _transform(chunck, encoding, callback) {
    if (this.act === "encode") {
      result = encode(chunck.toString(), this.shift);
    } else {
      result = decode(chunck.toString(), this.shift);
    }
    this.push(result);
    callback();
  }

  _flush(callback) {
    this.push(null);
    callback();
  }
}

function readStream(input) {
  const rStream = fs.createReadStream(input);
  rStream.on("error", (err) => {
    process.stderr.write("Input path is not correct");
    process.exit(4);
  });
  return rStream;
}

function writeStream(output) {
  const wStream = fs.createWriteStream(output, { flags: "a" });
  wStream.on("error", (err) => {
    process.stderr.write("Input path is not correct");
    process.exit(4);
  });
  return wStream;
}

module.exports = { Chiper, readStream, writeStream };
