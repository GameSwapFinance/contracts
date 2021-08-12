// Deploys a test chef and loads it with test tokens.  Runs the line below to deploy.
// truffle migrate --network polygon -f 3 --dry-run 

var Token = artifacts.require("StonkMoon");
var smartChef = artifacts.require("ProfitSharingChef");

const web3ToWei = (amount) => web3.utils.toWei((amount).toString(), "ether");

module.exports = function (deployer, network, accounts) {



    deployer.then(async () => {
        try {

            
            // Create test token
            await deployer.deploy(Token);
            const TokenInstance = await Token.deployed(); console.log(`TokenInstance: ${TokenInstance.address}`)


        } catch (e) {
            console.log(e);
        }

    })
}