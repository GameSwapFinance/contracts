// Deploys a test chef and loads it with test tokens.  Runs the line below to deploy.
// truffle migrate --network polygon -f 4 --dry-run 

var smartChef = artifacts.require("ProfitSharingChef");

const web3ToWei = (amount) => web3.utils.toWei((amount).toString(), "ether");

module.exports = function (deployer, network, accounts) {
    const DEV = accounts[0]; 

    const blocksPerDay = 41000;
    // 9,000 matic to give away
    // blocks per week 288,000
    // Rewards per block .03125
    // .0069

    const startblock = 15283985
    const endblock = startblock + 288000;

    deployer.then(async () => {
        try {

            // Deploy chef
            await deployer.deploy(smartChef, 
                '0x4BEcDD1704e16962053792fd0d6Baa533Daaa702', // STONKX
                '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', // Matic
                '31250000000000000',
                startblock,
                endblock,
                500, // 5% deposit fee
                '0xFb546fAb48E1bF83b57Cb91F64E418419A975022' // Fee address
                );
                const ChefInstance = await smartChef.deployed(); console.log(`SmartChefInstance: ${ChefInstance.address}`)
        
            console.log(`Successfully deployed the project to ${network}. `)
            
        } catch (e) {
            console.log(e);
        }

    })
}