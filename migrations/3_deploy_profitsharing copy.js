// Deploys a test chef and loads it with test tokens.  Runs the line below to deploy.
// truffle migrate --network polygon -f 3 --dry-run 

var Token = artifacts.require("TheToken");
var smartChef = artifacts.require("ProfitSharingChef");

const web3ToWei = (amount) => web3.utils.toWei((amount).toString(), "ether");

module.exports = function (deployer, network, accounts) {



    deployer.then(async () => {
        try {

            const DEV = accounts[0];
            let block = await web3.eth.getBlock("latest");
            console.log(`Current block: ${block.number}`)
            // const stakeToken = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"; // WMATIC
            const stakeToken = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"; // USDC
            const rewardToken = "0xcd7199ba48a75b8885cd3e916596472d1a5763b7"; // Stonk-Share
            const depositFee = 400;
            const feeAddress = "0x40764fc19cdd4F4Befe0182423E38E2556290ab0"; // Stonk-fees

            const tokensDistributed = 350;
            const blocksPerDay = 41000;
            const startBlock = 17425500;
            const endBlock = startBlock + (blocksPerDay * 7);

            const numberofBlocks = endBlock - startBlock;
            const tokensPerBlock = web3ToWei((tokensDistributed / numberofBlocks).toFixed(18));
            console.log(`Tokens per block: ${tokensPerBlock} / ${numberofBlocks}`);

            // Create test token
            // await deployer.deploy(Token);
            // const TokenInstance = await Token.deployed(); console.log(`TokenInstance: ${TokenInstance.address}`)

            // Get Block

            // Deploy chef
            await deployer.deploy(smartChef,
                stakeToken, 
                rewardToken, 
                tokensPerBlock,
                startBlock,
                endBlock,
                depositFee, 
                feeAddress 
            );
            const ChefInstance = await smartChef.deployed(); console.log(`SmartChefInstance: ${ChefInstance.address}`)

            // Mint test coins to chef
            console.log(`Balance DEV before: ${await TokenInstance.balanceOf(ChefInstance.address)}`)
            await TokenInstance.mint(ChefInstance.address, web3ToWei(1000), { from: DEV }) // - TESTING
            console.log(`Balance DEV after: ${await TokenInstance.balanceOf(ChefInstance.address)}`)

            console.log(`Successfully deployed the project to ${network}. `)

        } catch (e) {
            console.log(e);
        }

    })
}