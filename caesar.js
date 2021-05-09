const fs = require("fs");
const path = require("path");
const { Command } = require("commander");
const programmer = new Command();
const { pipeline } = require("stream");
const { Chiper, readStream, writeStream } = require("./cipher");

let shft = 0;
let act = "";
let inputText = "";

programmer
  .requiredOption("-s, --shift <Numer>", "value of shift")
  .option("-i, --input [val]", "input file or value")
  .option("-o, --output [val]", "output file or value")
  .requiredOption("-a, --action <type>", "type of action (encode/decode)")
  .parse(process.argv);

const opt = programmer.opts();
if (opt.shift && opt.shift !== undefined && parseInt(opt.shift)) {
  shft = parseInt(opt.shift, 10);
} else {
  process.stderr.write("Missing or incorrect required parametr 'Shift'");
  process.exit(4);
}
if ((opt.action === "encode" || opt.action === "decode") && opt.action.length > 0) {
  act = opt.action;
} else {
  process.stderr.write("Illegal or incorrect action. Use 'encode' or 'decode'");
  process.exit(4);
}

const str = new Chiper(inputText, shft, act);

if (opt.input && opt.input.length > 0) {
  const inputStream = readStream(path.join(__dirname, `${opt.input.toString()}`));
  if (opt.output && opt.output.length > 0) {
    const outputStream = writeStream(path.join(__dirname, `${opt.output.toString()}`));
    pipeline(inputStream, str, outputStream, (err) => {
      if (err) {
        process.stderr.write("Incorect file address");
        process.exit(4);
      }
    });
  } else {
    pipeline(inputStream, str, process.stdout, (err) => {
      if (err) {
        process.stderr.write("Incorect file address");
        process.exit(4);
      }
    });
  }
} else {
  const inputStream = process.stdin;
  if (opt.output && opt.output.length > 0) {
    const outputStream = writeStream(path.join(__dirname, `${opt.output.toString()}`));
    pipeline(inputStream, str, outputStream, (err) => {
      if (err) {
        process.stderr.write("Incorect file address");
        process.exit(4);
      }
    });
  } else {
    pipeline(inputStream, str, process.stdout, (err) => {
      if (err) {
        process.stderr.write("Incorect file address");
        process.exit(4);
      }
    });
  }
}
