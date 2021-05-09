const reg = /[a-zA-Z]/;

function decode(crypt, shift) {
  const stepback = -shift;
  let text = "";
  for (let i = 0; i < crypt.length; i++) {
    let mem = crypt.charAt(i);
    let memind = crypt.charCodeAt(i);
    if (mem.match(reg)) {
      text += String.fromCharCode(transfer(memind, stepback));
    } else {
      text += mem;
    }
  }
  return text;
}

function encode(text, shift) {
  let crypt = "";
  for (let i = 0; i < text.length; i++) {
    let mem = text.charAt(i);
    let memind = text.charCodeAt(i);
    if (mem.match(reg)) {
      crypt += String.fromCharCode(transfer(memind, shift));
    } else {
      crypt += mem;
    }
  }
  return crypt;
}

function transfer(num, s) {
  let sh = 0;
  if (s > 26 || s < -26) {
    sh = s % 26;
  } else {
    sh = s;
  }
  let calc = 0;
  if (num <= 90) {
    calc = num + sh;
    if (calc > 90) {
      return calc - 26;
    }
    if (calc < 65) {
      return calc + 26;
    }
    return calc;
  } else {
    calc = num + sh;
    if (calc > 122) {
      return calc - 26;
    }
    if (calc < 97) {
      return calc + 26;
    }
    return calc;
  }
}

module.exports = { encode, decode };
