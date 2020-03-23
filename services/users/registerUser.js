const constant = require('../../constants');

let registerUser = function (enrollmentID, firstName, lastName, role, organisation, mspId) {
  const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
  const path = require('path');

  const ccpPath = path.resolve(constant.path, constant.network, `connection-${organisation}.json`);

  async function main() {
    try {

      // Create a new file system based wallet for managing identities.
      const walletPath = path.join(process.cwd(), 'wallet');
      const wallet = new FileSystemWallet(walletPath);
      console.log(`Wallet path: ${ walletPath }`);

      // Check to see if we've already enrolled the user.
      const userExists = await wallet.exists(enrollmentID);
      if (userExists) {
        return {"text": `An identity for the user "${ enrollmentID }" already exists in the wallet`};
      }

      // Check to see if we've already enrolled the admin user.
      const adminExists = await wallet.exists(`admin_${organisation}`);
      if (!adminExists) {
        return {"text":`An identity for the admin user "admin_${organisation}" does not exist in the wallet`};
      }

      // Create a new gateway for connecting to our peer node.
      const gateway = new Gateway();
      await gateway.connect(ccpPath, { wallet, identity: `admin_${organisation}`, discovery: { enabled: true, asLocalhost: true } });

      // Get the CA client object from the gateway for interacting with the CA.
      const ca = gateway.getClient().getCertificateAuthority();
      const adminIdentity = gateway.getCurrentIdentity();

      // Register the user, enroll the user, and import the new identity into the wallet.
      const secret = await ca.register({
        affiliation : 'org2.department1',
        enrollmentID: enrollmentID,
        role        : 'client',
        id: enrollmentID,
        attrs: [
          {
            id: enrollmentID,
            firstName: firstName,
            lastName: lastName,
            role: role,
            org: organisation,
          }
        ]

      }, adminIdentity);
      const enrollment = await ca.enroll({ enrollmentID: enrollmentID, enrollmentSecret: secret, profile: "tls" });
      const userIdentity = X509WalletMixin.createIdentity(`${mspId}`, enrollment.certificate, enrollment.key.toBytes());
      await wallet.import(enrollmentID, userIdentity);
      console.log(`Successfully registered and enrolled admin user ${ enrollmentID } and imported it into the wallet`);

      return {"text": `Successfully registered and enrolled admin user ${ enrollmentID } and imported it into the wallet`};

    } catch (error) {
      return {"error":`Failed to register user ${ enrollmentID }: ${ error }`};
    }
  }

  return main();
};

module.exports = registerUser;
