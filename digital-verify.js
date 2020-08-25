const crypto = require('crypto');
const { readFileSync } = require('fs');

let signature;
let publicKey;

try {
  if (process.argv.length < 3) {
    throw new Error('Path to signature file missing');
  }

  signature = readFileSync(process.argv[2]).toString();
  publicKey = readFileSync('./node-key.pub');
} catch (err) {
  console.log(err.message);
  process.exit(1);
}

console.log('Digital signature for the document:\n\n', signature);
const verifier = crypto.createVerify('RSA-SHA256');

verifier.on('finish', () => {
  const isVerified = verifier.verify(publicKey, signature, 'base64');
  if (isVerified) {
    process.stdout.write('\n\033[0;32mVerified ✓\033[0m');
    process.exit(0);
  } else {
    process.stdout.write('\n\033[0;31mInvalid signature ✗\033[0m');
    process.exit(1);
  }
});

process.stdin.pipe(verifier);
