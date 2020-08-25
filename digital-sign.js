const crypto = require('crypto');
const { readFileSync} = require('fs');

const privateKey = readFileSync('./node-key.pem');

const signer = crypto.createSign('RSA-SHA256');

signer.on('finish', () => {
  process.stdout.write(signer.sign(privateKey, 'base64'));
});

process.stdin.pipe(signer);

