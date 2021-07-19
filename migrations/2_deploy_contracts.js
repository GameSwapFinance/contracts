// truffle migrate --network polygon -f 2 --dry-run 
var Token = artifacts.require("StonkToken");

const web3ToWei = (amount) => web3.utils.toWei((amount).toString(), "ether");

module.exports = function (deployer, network, accounts) {

    const burnPercent = .5;
    const burnPercentWei = web3ToWei(burnPercent);
    console.log(`Burn percent: ${burnPercent}`);
    console.log(`Burn percent in wei: ${burnPercentWei}`);

    /*
    deployer.then(async () => {
        try {
            // DEPLOY token 
            // string memory _name, string memory _symbol, address _devAddress, uint256 _burnPercent
            await deployer.deploy(
                Token,
                'Test Stonk Share',
                'tStonkS',
                '0x9bda19fD2F24999512d937B595AFD3989403BFdf',
                0);
            const TokenInstance = await Token.deployed(); console.log(`TokenInstance: ${TokenInstance.address}`)
        
            console.log(`Successfully deployed the project to ${network}. `)

        } catch (e) {
            console.log(e);
        }
    })
    */
}