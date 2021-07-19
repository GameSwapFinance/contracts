// truffle exec automation/CreateStonkyPools.js --network polygon
const { Console } = require('console');
const Web3 = require('web3');
const MasterChef = artifacts.require("StonkChef");
const web3ToWei = (amount) => web3.utils.toWei((amount).toString(), "ether");

let mc = null;

const contract_address = '0xd43439a5C9d0C5BC305dEFdf318dC56d9bE7F448'; // STONK-Z chef

async function CreatePool(address, alloc, fee, harvestLockSeconds){
    /*if(await mc.poolExistence(address))
        {
            console.log('Pool already exists for '+address);
        }
        else{*/
            await mc.add(alloc * 100, address, fee * 100, harvestLockSeconds, 1)
            console.log(`mc.Add(${alloc * 100},${address},${fee * 100},${harvestLockSeconds},1)`);
        //}
}

async function GetPoolInfo(pid)
{
    let result = await mc.poolInfo(pid);
    console.log(JSON.stringify(result));
}

module.exports = async function (callback) {
    // Contract ABI
    const abi = [{"inputs":[{"internalType":"contract Stonky","name":"_stonk","type":"address"},{"internalType":"address","name":"_feeAddress","type":"address"},{"internalType":"uint256","name":"_stonkPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountLockedUp","type":"uint256"}],"name":"RewardLockedUp","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAXIMUM_HARVEST_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"uint256","name":"_harvestInterval","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"canHarvest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingStonk","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accStonkPerShare","type":"uint256"},{"internalType":"uint16","name":"depositFeeBP","type":"uint16"},{"internalType":"uint256","name":"harvestInterval","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"uint256","name":"_harvestInterval","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"setDevAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeAddress","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stonk","outputs":[{"internalType":"contract Stonky","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stonkPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalLockedUpRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_stonkPerBlock","type":"uint256"}],"name":"updateEmissionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"name":"updateStartBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"rewardLockedUp","type":"uint256"},{"internalType":"uint256","name":"nextHarvestUntil","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

    // Get egg per block 
    try {
        console.log('Start pool deploy');

        // Fetch the deployed exchange
        mc = await MasterChef.at(contract_address);
        console.log('MC fetched', mc.address);

        // Fetch egg per block
        let epg = await mc.stonkPerBlock();
        console.log('EPB: '+epg);

        // Create pools
        // Phase 1
        
        await CreatePool('0x1F1b5ce5fEDb6F27Db51C4d5e885d952f8371257', 1000, 1.5, 0) // 0 StonkZ token 
        await CreatePool('0x0652cf35852e8b56cda90e5da23ad32995b4fe96', 1000, 0, 0) // 1 StonkZ-USDC 
         await CreatePool('0xc2132d05d31c914a87c6611c10748aeb04b58e8f', 50, 4, 0); // USDT 25% aloc, 4% fee, 14 hour harvest delay
         await CreatePool('0x2791bca1f2de4661ed88a30c99a7a9449aa84174', 50, 4, 0); // USDC  25% aloc, 4% fee, 14 hour harvest delay
         await CreatePool('0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', 50, 4, 0); // Wmatic 25% aloc, 4% fee, 14 hour harvest delay
         await CreatePool('0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6', 50, 4, 0); // WBTC 25% aloc, 4% fee, 14 hour harvest delay
         await CreatePool('0x7ceb23fd6bc0add59e62ac25578270cff1b9f619', 50, 4, 0); // WETH 25% aloc, 4% fee, 14 hour harvest delay
        await CreatePool('0x8a953cfe442c5e8855cc6c61b1293fa648bae472', 50, 4, 0) // Polydoge
        await CreatePool('0x831753dd7087cac61ab5644b308642cc1c33dc13', 50, 4, 0); // Quick
        await CreatePool('0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', 50, 4, 0); // Dai
        await CreatePool('0x2cf7252e74036d1da831d11089d326296e64a728',50,4, 0); // USDC USDT
        await CreatePool('0xf6a637525402643b0654a54bead2cb9a83c8b498',50,4, 0); // WBTC USDC
        await CreatePool('0x6e7a5fafcec6bb1e78bae2a1f0b612012bf14827',50,4, 0); // Wmatic USDC
        /*
        await CreatePool('0x019ba0325f1988213d448b3472fa1cf8d07618d7',24,4); // Quick WMatic
        await CreatePool('0x831753dd7087cac61ab5644b308642cc1c33dc13',23,4); // Quick
        */

        // Phase 3
        /*
        await CreatePool('0x3a3df212b7aa91aa0402b9035b098891d276572b', 10, 4) // Fish
        await CreatePool('0xd86b5923f3ad7b585ed81b448170ae026c65ae9a', 10, 4) // Iron
        await CreatePool('0x8a953cfe442c5e8855cc6c61b1293fa648bae472', 10, 4) // Polydoge
        await CreatePool('0x8a953cfe442c5e8855cc6c61b1293fa648bae472', 10, 4) // Malt-DIA
        await CreatePool('0x4cebdbcb286101a17d3ea1f7fe7bbded2b2053dd',5,4); // YLD
        */

        console.log('End pool deploy');
    }
    catch (err) {
        console.log('Error: ' + err);
    };
    callback();
}