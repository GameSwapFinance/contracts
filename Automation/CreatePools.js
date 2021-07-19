// truffle exec automation/CreatePools.js --network polygon
const { Console } = require('console');
const Web3 = require('web3');
const MasterChef = artifacts.require("MasterChefV2");
const web3ToWei = (amount) => web3.utils.toWei((amount).toString(), "ether");

let mc = null;

const contract_address = '0x14d3C919262A0da0B8846507F65fd76f8a1Da6A9'; // STONK-X
// var contract_address = '0xe823192885192092E73E42AAB42D23bf18276c55' // STONK

async function CreatePool(address, alloc, fee){
    if(await mc.poolExistence(address))
        {
            console.log('Pool already exists for '+address);
        }
        else{
            await mc.add(alloc * 100, address, fee * 100, 1);
            console.log(`mc.Add(${alloc * 100},${address},${fee * 100},1)`);
        }
}

async function GetPoolInfo(pid)
{
    let result = await mc.poolInfo(pid);
    console.log(JSON.stringify(result));
}

module.exports = async function (callback) {
    // Contract ABI
    const abi = [{ "type": "constructor", "stateMutability": "nonpayable", "inputs": [{ "type": "address", "name": "_egg", "internalType": "contract TheToken" }, { "type": "address", "name": "_devaddr", "internalType": "address" }, { "type": "address", "name": "_feeAddress", "internalType": "address" }, { "type": "uint256", "name": "_eggPerBlock", "internalType": "uint256" }, { "type": "uint256", "name": "_startBlock", "internalType": "uint256" }] }, { "type": "event", "name": "Deposit", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "EmergencyWithdraw", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "OwnershipTransferred", "inputs": [{ "type": "address", "name": "previousOwner", "internalType": "address", "indexed": true }, { "type": "address", "name": "newOwner", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "SetDevAddress", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "address", "name": "newAddress", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "SetFeeAddress", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "address", "name": "newAddress", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "UpdateEmissionRate", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "goosePerBlock", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "UpdateStartBlock", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "newStartBlock", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Withdraw", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "BONUS_MULTIPLIER", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "add", "inputs": [{ "type": "uint256", "name": "_allocPoint", "internalType": "uint256" }, { "type": "address", "name": "_lpToken", "internalType": "contract IBEP20" }, { "type": "uint16", "name": "_depositFeeBP", "internalType": "uint16" }, { "type": "bool", "name": "_withUpdate", "internalType": "bool" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "deposit", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "uint256", "name": "_amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "dev", "inputs": [{ "type": "address", "name": "_devaddr", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "devaddr", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "contract TheToken" }], "name": "egg", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "eggPerBlock", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "emergencyWithdraw", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "feeAddress", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "getMultiplier", "inputs": [{ "type": "uint256", "name": "_from", "internalType": "uint256" }, { "type": "uint256", "name": "_to", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "massUpdatePools", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "owner", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "pendingEgg", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "address", "name": "_user", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "poolExistence", "inputs": [{ "type": "address", "name": "", "internalType": "contract IBEP20" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "lpToken", "internalType": "contract IBEP20" }, { "type": "uint256", "name": "allocPoint", "internalType": "uint256" }, { "type": "uint256", "name": "lastRewardBlock", "internalType": "uint256" }, { "type": "uint256", "name": "accEggPerShare", "internalType": "uint256" }, { "type": "uint16", "name": "depositFeeBP", "internalType": "uint16" }], "name": "poolInfo", "inputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "poolLength", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "renounceOwnership", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "set", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "uint256", "name": "_allocPoint", "internalType": "uint256" }, { "type": "uint16", "name": "_depositFeeBP", "internalType": "uint16" }, { "type": "bool", "name": "_withUpdate", "internalType": "bool" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setFeeAddress", "inputs": [{ "type": "address", "name": "_feeAddress", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "startBlock", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalAllocPoint", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "transferOwnership", "inputs": [{ "type": "address", "name": "newOwner", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "updateEmissionRate", "inputs": [{ "type": "uint256", "name": "_eggPerBlock", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "updatePool", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "updateStartBlock", "inputs": [{ "type": "uint256", "name": "_startBlock", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "amount", "internalType": "uint256" }, { "type": "uint256", "name": "rewardDebt", "internalType": "uint256" }], "name": "userInfo", "inputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }, { "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdraw", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "uint256", "name": "_amount", "internalType": "uint256" }] }];

    // Get egg per block 
    try {
        console.log('Start pool deploy');

        // Fetch the deployed exchange
        mc = await MasterChef.at(contract_address);
        console.log('MC fetched', mc.address);

        // Fetch egg per block
        let epg = await mc.eggPerBlock();
        console.log('EPB: '+epg);

        // Create pools
        await CreatePool('0xF7294f11120157Feb6461d12BC1Ed4b75061c81b',100,0); // Native LP 
        await CreatePool('0x6e7a5fafcec6bb1e78bae2a1f0b612012bf14827',25,4);
        await CreatePool('0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',10,4);
        await CreatePool('0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',5,4);
        await CreatePool('0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',20,4);
        await CreatePool('0x831753dd7087cac61ab5644b308642cc1c33dc13',23,4);
        await CreatePool('0x4cebdbcb286101a17d3ea1f7fe7bbded2b2053dd',5,4);
        await CreatePool('0xc2132d05d31c914a87c6611c10748aeb04b58e8f',15,4);
        await CreatePool('0x2791bca1f2de4661ed88a30c99a7a9449aa84174',15,4);
        await CreatePool('0x4BEcDD1704e16962053792fd0d6Baa533Daaa702',50,0); // Native token
        await CreatePool('0x2cf7252e74036d1da831d11089d326296e64a728',24,4);
        await CreatePool('0xf6a637525402643b0654a54bead2cb9a83c8b498',25,4);
        await CreatePool('0x019ba0325f1988213d448b3472fa1cf8d07618d7',24,4);

        await CreatePool('0x3a3df212b7aa91aa0402b9035b098891d276572b', 10, 4) // Fish
        await CreatePool('0xd86b5923f3ad7b585ed81b448170ae026c65ae9a', 10, 4) // Iron
        await CreatePool('0x8a953cfe442c5e8855cc6c61b1293fa648bae472', 10, 4) // Polydoge
        await CreatePool('0x8a953cfe442c5e8855cc6c61b1293fa648bae472', 10, 4) // Malt-DIA

        console.log('End pool deploy');
    }
    catch (err) {
        console.log('Error: ' + err);
    };
    callback();
}