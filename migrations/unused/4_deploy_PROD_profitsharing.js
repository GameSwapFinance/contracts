// Deploys a test chef and loads it with test tokens.  Runs the line below to deploy.
// truffle migrate --network polygon -f 4 --dry-run 

var smartChef = artifacts.require("ProfitSharingChef");

const web3ToWei = (amount) => web3.utils.toWei((amount).toString(), "ether");

module.exports = function (deployer, network, accounts) {
    const DEV = accounts[0]; 

    const blocksPerDay = 38400;
    // 850 tokens to give away
    // blocks in period 268.800
    // Rewards per block .0031622

    const startblock = 16868421
    const endblock   = startblock + 268800; // 7 days

    deployer.then(async () => {
        try {

            // Deploy chef
            await deployer.deploy(smartChef, 
                '0x1F1b5ce5fEDb6F27Db51C4d5e885d952f8371257', // STONK Z
                '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // WMATIC
                '3720200000000000',
                startblock,
                endblock,
                500, // 5% deposit fee
                '0x3624F2f174da83094D921bC6723c517dF9E5D6bF' // Fee address
                );
                const ChefInstance = await smartChef.deployed(); console.log(`SmartChefInstance: ${ChefInstance.address}`)
        
            console.log(`Successfully deployed the project to ${network}. `)
            
        } catch (e) {
            console.log(e);
        }

    })
}