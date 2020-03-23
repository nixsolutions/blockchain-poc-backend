const constant = require('../../constants');

let addCard = function (userId, cardId, name, birthDate, height, weight, timestamp) {
  const { FileSystemWallet, Gateway } = require('fabric-network');
  const path = require('path');

  const ccpPath = path.resolve(constant.path, constant.network, 'connection-parents.json');

  async function main() {
    try {
      const walletPath = path.join(process.cwd(), 'wallet');
      const wallet = new FileSystemWallet(walletPath);

      const userExists = await wallet.exists(userId);

      if (!userExists) {
        return { 'text': 'An identity for the user "userId" does not exist in the wallet' };
      }

      const gateway = new Gateway();
      await gateway.connect(ccpPath, { wallet, identity: userId, discovery: { enabled: true, asLocalhost: true } });

      const network = await gateway.getNetwork('parentshospital');
      const contract = network.getContract('poc');
      const cardData = {
        id        : cardId,
        type      : 'card',
        name,
        birth_date: birthDate,
        height,
        weight,
        timestamp,
        parent    : userId,
      };

      const result = await contract.createTransaction('createCard')
          .submit(cardId, JSON.stringify(cardData))
      ;

      return { 'text': result.toString() };
    } catch (error) {
      return { 'error': `Failed to evaluate transaction: ${ error }` };
    }
  }

  return main();
};

module.exports = addCard;
