export const jsonParse = (obj) => {
    try {
        return JSON.parse(obj);
    } catch (e) {
        return obj;
    }
};

export const decodeBase64 = (s, pass) => {
    /* see http://stackoverflow.com/questions/2820249/base64-encoding-and-decoding-in-client-side-javascript
      regular b64: AZaz09+/,  (, or =) for pass==1
      type 1:  09azAZ-_,
      type 2:  -_az09AZ,   DEFAULT
    */
    if ((s && typeof s === 'object') || (s && s[0]) === '{') {
        // s must be an string to be decrypted
        return s;
    }
    const e = {};
    const AZ = [65, 91];
    const az = [97, 123];
    const n09 = [48, 58];
    const w = String.fromCharCode;
    let z;
    let i;
    let j = 0;
    let r = '';
    // type = pass ? 0 : 2,
    /* istanbul ignore next */
    const n = pass ? [AZ, az, n09, 43, 47] : [45, 95, az, n09, AZ]; // type:0 or 2
    /* istanbul ignore next */
    const lenFlag = pass ? 0 : 2;

    // map chars to ascii code
    for (z in n) {
        if (n[z] && typeof n[z] === 'object') {
            for (i = n[z][0]; i < n[z][1]; i++) {
                e[w(i)] = j++;
            }
        } else {
            e[w(n[z])] = j++;
        }
    }

    for (i = lenFlag; i < s.length - lenFlag; i += 72) {
        const o = s.substring(i, i + 72);
        let b = 0;
        let c;
        let x;
        let l = 0;
        let d;
        for (x = 0; x < o.length; x++) {
            c = e[o.charAt(x)];
            b = (b << 6) + c;
            l += 6;
            while (l >= 8) {
                d = (b >>> (l -= 8)) % 256;
                if (d) r += w(d);
            }
        }
    }
    return r;
};

const encode8 = (string, z) => {
    string = string.replace(/\r\n/g, '\n');
    const f = String.fromCharCode;
    let utftext = '';
    let n;
    let c;

    for (n = 0; n < string.length; n++) {
        c = string.charCodeAt(n);
        utftext += z ?
            /* istanbul ignore next */
            c + z :
            c < 128 ?
            f(c) :
            /* istanbul ignore next */
            c > 127 && c < 2048 ?
            f((c >> 6) | 192) + f((c & 63) | 128) :
            f((c >> 12) | 224) + f(((c >> 6) & 63) | 128) + f((c & 63) | 128);
    }
    return utftext;
};

export const encodeBase64 = (input, pass) => {
    /**
     *
     *  Base64 encode / decode
     *  see http://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript#246813
     *  also encrypted -AliM
     **/
    if (input && typeof input === 'object') {
        input = JSON.stringify(input);
    }
    const chr = [];
    const enc = [];
    let i = 0;
    let j;
    let k;
    let i2 = 0;
    let output = pass ? '' : '1,';
    const f = String.fromCharCode;

    input = encode8(input);

    while (i < input.length) {
        for (j = 0; j < 3; j++) chr[j] = input.charCodeAt(i++);

        enc[0] = chr[0] >> 2;
        enc[1] = ((chr[0] & 3) << 4) | (chr[1] >> 4);
        enc[2] = ((chr[1] & 15) << 2) | (chr[2] >> 6);
        enc[3] = chr[2] & 63;

        if (isNaN(chr[1])) enc[2] = enc[3] = 64;
        else if (isNaN(chr[2])) enc[3] = 64;

        for (j = 0; j < 4; j++) {
            k = enc[j];
            if (pass === '1')
                // regular base64
                output += k < 26 ? f(k + 65) : k < 52 ? f(k + 71) : k < 62 ? f(k - 4) : '+/,'.charAt(k - 62);
            // Aa0 [[65,91],[97,123],[48,58]]
            else {
                if (pass && k < 64) {
                    // adding password
                    k = k ^ pass.charCodeAt(i2 % pass.length) % 64;
                    i2++;
                }
                output += k < 10 ? f(k + 48) : k < 36 ? f(k + 87) : k < 62 ? f(k + 29) : '-_,'.charAt(k - 62); // 0aA for 1,
            }
        }
    }
    return output;
};
