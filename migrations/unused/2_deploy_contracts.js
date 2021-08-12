// truffle migrate --network polygon -f 2 --dry-run 
// truffle-flattener contracts/StonkToken.sol > flattened/FlattenedStonkToken.sol
var Token = artifacts.require("StonkToken");

const web3ToWei = (amount) => web3.utils.toWei((amount).toString(), "ether");

module.exports = function (deployer, network, accounts) {
    const tokenName = 'https://Shares.Stonk.farm StonkShare Token';
    const tokenSymbol = 'StonkS';
    const devAddress = accounts[0];
    const burnPercent = .5;
    const initialSupply = 200;

    console.log(`Token Name: ${tokenName}`);
    console.log(`Token Symbol: ${tokenSymbol}`);
    console.log(`Dev Address: ${devAddress}`);
    console.log(`Burn Percent: ${burnPercent}%`);
    console.log(`Initial Token Supply: ${initialSupply}`);

    deployer.then(async () => {
        try {
            // DEPLOY token 
            // string memory _name, string memory _symbol, address _devAddress, uint256 _burnPercent
            await deployer.deploy(
                Token,
                tokenName,
                tokenSymbol,
                web3ToWei(burnPercent),
                web3ToWei(initialSupply));
            const TokenInstance = await Token.deployed(); console.log(`TokenInstance: ${TokenInstance.address}`)
            console.log(`Token deployed to address: ${TokenInstance.address}`);
            console.log(`Successfully deployed the project to ${network}. `)

        } catch (e) {
            console.log(e);
        }
    })
}