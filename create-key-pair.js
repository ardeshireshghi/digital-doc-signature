const { createWriteStream } = require('fs');
const { promisify } = require('util');
const crypto = require('crypto');

const generateKeyPair = promisify(crypto.generateKeyPair);

(async () => {
try {  
  const { publicKey, privateKey } = await generateKeyPair('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    }
  });
  createWriteStream('./node-key.pem').write(privateKey);
  createWriteStream('./node-key.pub').write(publicKey);
} catch (err) {
  
  console.error(err);
  process.exit(1);
}
})();
