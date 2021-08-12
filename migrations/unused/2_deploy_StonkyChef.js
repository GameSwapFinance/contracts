// truffle migrate --network polygon -f 2 --dry-run 
// truffle-flattener contracts/Stonky.sol > flattened/FlattenedStonky.sol
// truffle-flattener contracts/StonkChef.sol > flattened/FlattenedStonkChef.sol
var Token = artifacts.require("Stonky");
var MasterChef = artifacts.require("StonkChef");
var Timelock = artifacts.require("Timelock");
var FeeAddress = '0x40764fc19cdd4F4Befe0182423E38E2556290ab0';
var StonkAddress = '0xcd7199bA48A75b8885cD3E916596472d1a5763B7';
var TokensPerBlock = .01;
var StartBlockBuffer = 100;

const web3ToWei = (amount) => web3.utils.toWei((amount).toString(), "ether");

module.exports = function (deployer, network, accounts) {
    const DEV = accounts[0]; 
    deployer.then(async () => {
        try {
            // DEPLOY token 
            //await deployer.deploy(Token, '0x9bda19fD2F24999512d937B595AFD3989403BFdf', 0);
            //const TokenInstance = await Token.deployed(); console.log(`TokenInstance: ${TokenInstance.address}`);

            // Deploy timelock
            await deployer.deploy(Timelock, DEV, 21600); // six hours
            const TimelockInstance = await Timelock.deployed(); console.log(`TimelockInstance: ${TimelockInstance.address}`);

            // DEPLOY MASTERCHEF
            let block = await web3.eth.getBlock("latest");
            let startBlock = 17257000; 
            console.log('Minting will start at block: ' + startBlock);
            // await deployer.deploy(MasterChef, TokenInstance.address, DEV, '0xFb546fAb48E1bF83b57Cb91F64E418419A975022', web3ToWei(.5), block.number); 
            await deployer.deploy(MasterChef, StonkAddress, FeeAddress, web3ToWei(TokensPerBlock), startBlock);

            const MasterChefInstance = await MasterChef.deployed(); console.log(`MasterChefInsance: ${MasterChefInstance.address}`)
        
            // SET TIMELOCK MULTISIG ADMIN
            // await TimelockInstance.setPendingAdmin(GnosisWalletInstance.address, { from: DEV });

            // INITIAL Tokens
            //console.log(`Balance DEV before: ${await TokenInstance.balanceOf(DEV)}`)
            //await TokenInstance.mint(DEV, web3ToWei(400), { from: DEV }) // - TESTING
            //console.log(`Balance DEV after: ${await TokenInstance.balanceOf(DEV)}`)

            // TRANSFER OWNERSHIP TO MASTERCHEF
            //await TokenInstance.transferOwnership(MasterChefInstance.address, { from: DEV });

            // Create pools
            //await CreatePool(TokenInstance.address,100,0,120); 
            //await MasterChefInstance.Add(100 * 100, TokenInstance.address, 0 * 100, 7200, 1) // Native token 100 aloc, no fee, 2 hour harvest delay



            /*let UniswapV2FactoryInstance;
            let SASHIMI_ETH, MOCKERC20_ETH, TOGETHER
            if (network == 'kovan') {

                // CREATE UNISWAP FACTORY CONTRACT
                const UniswapV2FactoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
                UniswapV2FactoryInstance = await UniswapV2Factory.at(UniswapV2FactoryAddress);
            
                // CREATE 3 POOLS - First Pool > Sashimi-Weth
                SASHIMI_ETH = await UniswapV2Pair.at((await UniswapV2FactoryInstance.createPair(SashimiTokenInstance.address, WETH9Instance.address)).logs[0].args.pair);
                await SashimiTokenInstance.transfer(SASHIMI_ETH.address, '10000000000000000000', { from: DEV }); // 10 SUSHI
                await WETH9Instance.transfer(SASHIMI_ETH.address, '1000000000000000', { from: DEV }); // 0.001 WETH
                await SASHIMI_ETH.mint(DEV);
                console.log(`SUSHI_WETH Address: ${SASHIMI_ETH.address}`);

                // Second Pool > MockERC20-Weth
                MOCKERC20_ETH = await UniswapV2Pair.at((await UniswapV2FactoryInstance.createPair(MockERC20Instance.address, WETH9Instance.address)).logs[0].args.pair);
                await MockERC20Instance.transfer(MOCKERC20_ETH.address, '10000000000000000000', { from: DEV }); // 10 MOCKERC20
                await WETH9Instance.transfer(MOCKERC20_ETH.address, '1000000000000000', { from: DEV }); // 0.001 WETH
                await MOCKERC20_ETH.mint(DEV);
                console.log(`MOCKERC20_WETH Address: ${MOCKERC20_ETH.address}`)
            
                // Third Pool > Sashimi-MockERC20
                TOGETHER = await UniswapV2Pair.at((await UniswapV2FactoryInstance.createPair(SashimiTokenInstance.address, MockERC20Instance.address)).logs[0].args.pair);
                await MockERC20Instance.transfer(TOGETHER.address, '10000000000000000000', { from: DEV }); // 10 MOCKERC20
                await SashimiTokenInstance.transfer(TOGETHER.address, '10000000000000000000', { from: DEV }); // 10 SUSHI
                await TOGETHER.mint(DEV);
                console.log(`MOCKERC20_SUSHI Address: ${TOGETHER.address}`)

                await MasterChefInstance.add('2000', SASHIMI_ETH.address, true);
                await MasterChefInstance.add('3000', MOCKERC20_ETH.address, true);
                await MasterChefInstance.add('5000', TOGETHER.address, true);
            }*/
        
            console.log(`Successfully deployed the project to ${network}. `)

        } catch (e) {
            console.log(e);
        }

    })
}