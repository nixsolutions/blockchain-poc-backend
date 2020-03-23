const constant = require('../constants');

let enrollAdmin = function (organisation, mspId) {
  const FabricCAServices = require('../node_modules/fabric-ca-client');
  const { FileSystemWallet, X509WalletMixin } = require('../node_modules/fabric-network');
  const fs = require('fs');
  const path = require('path');

  const ccpPath = path.resolve(constant.path, constant.network, `connection-${organisation}.json`);
  const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
  const ccp = JSON.parse(ccpJSON);

  async function main() {
    try {
      const caInfo = ccp.certificateAuthorities[`ca.${organisation}.poc-network.com`];
      const caTLSCACerts = caInfo.tlsCACerts.pem;
      const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

      const walletPath = path.join(process.cwd(), 'wallet');
      const wallet = new FileSystemWallet(walletPath);

      const adminExists = await wallet.exists(`admin_${organisation}`);

      if (adminExists) {
        console.log('An identity for the admin user "admin" already exists in the wallet');
        return {"text":"An identity for the admin user \"admin\" already exists in the wallet"};
      }

      // Enroll the admin user, and import the new identity into the wallet.
      const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw', profile: "tls" });
      const identity = X509WalletMixin.createIdentity(`${mspId}`, enrollment.certificate, enrollment.key.toBytes());
      await wallet.import(`admin_${organisation}`, identity);

      return {"text":"Successfully enrolled admin user \"admin\" and imported it into the wallet"};
    } catch (error) {
      return {"error":`Failed to enroll admin user "admin": ${error}`};
    }
  }

  return main();
};

module.exports = enrollAdmin;
