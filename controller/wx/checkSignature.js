const crypto = require('crypto');
const token = require('../../config').token;

function checkSignature(req) {
    let timestamp = req.query.timestamp;
    let nonce = req.query.nonce;
    let str = [token, timestamp, nonce].sort().join('');
    let _signature = crypto.createHash('sha1').update(str).digest('hex');
    return _signature === req.query.signature;
}

module.exports = checkSignature;