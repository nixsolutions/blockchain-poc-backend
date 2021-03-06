const constant = require('../../constants');

let getAllCards = function (enrollmentId) {
  const { FileSystemWallet, Gateway } = require('fabric-network');
  const path = require('path');

  const ccpPath = path.resolve(constant.path, constant.network, 'connection-parents.json');

  async function main() {
    try {
      const walletPath = path.join(process.cwd(), 'wallet');
      const wallet = new FileSystemWallet(walletPath);

      const userExists = await wallet.exists(enrollmentId);

      if (!userExists) {
        return {"text": `An identity for the user "${enrollmentId}" does not exist in the wallet`};
      }

      const gateway = new Gateway();
      await gateway.connect(ccpPath, { wallet, identity: enrollmentId, discovery: { enabled: true, asLocalhost: true } });
      const network = await gateway.getNetwork('parentshospital');
      const contract = network.getContract('medical-contract');

      const resultGetCard = await contract.evaluateTransaction("getCards", enrollmentId);

      return {'text':resultGetCard.toString()};
    } catch (error) {
      return {'error':`Failed to evaluate transaction: ${error}`};
    }
  }

  return main();
};

module.exports = getAllCards;
