function sha256_digest(message) {
    // 使用Web Crypto API生成SHA-256哈希
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(message))
        .then(function (hash) {
            return hex(hash);
        });
}

function hex(buffer) {
    var hexCodes = [];
    var view = new DataView(buffer);
    for (var i = 0; i < view.byteLength; i++) {
        var value = view.getUint8(i).toString(16);
        if (value.length === 1) {
            hexCodes.push('0');
        }
        hexCodes.push(value);
    }
    return hexCodes.join('');
}

export { sha256_digest, hex };