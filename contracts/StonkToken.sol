pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// STONKY
contract StonkToken is Ownable, ERC20 {
    // Dev address.
    uint256 public burnPercent;  //1e18 for 1% burn
    mapping(address => bool) public minters;

    constructor(string memory _name, string memory _symbol, uint256 _burnPercent, uint _initialSupply) public ERC20(_name, _symbol) {
        require(_burnPercent <= 10e18 && _burnPercent>=1e16 || _burnPercent == 0, 'burn: wut?');
        burnPercent = _burnPercent;
        _mint(msg.sender, _initialSupply);
        minters[msg.sender] = true;
    }

    function mint(address _to, uint256 _amount) public {
        require(minters[msg.sender], "!minter");
        _mint(_to, _amount);
    }

    function addMinter(address _minter) external onlyOwner {
        minters[_minter] = true;
    }

    function removeMinter(address _minter) external onlyOwner {
        minters[_minter] = false;
    }

    function transfer(address to, uint256 amount) override virtual public returns (bool) {
        return super.transfer(to, partialBurn(amount));
    }

     function partialBurn(uint256 amount) internal returns (uint256) {
        uint256 burnAmount = 0;
        burnAmount = amount.mul(burnPercent).div(100e18);

        if (burnAmount > 0) {
            _burn(msg.sender, burnAmount);
        }

        return amount.sub(burnAmount);
    }

    // Update burnPercent by the previous dev.
    function setBurnPercent(uint256 _burnPercent) public onlyOwner {
        require(_burnPercent <= 10e18 && _burnPercent>=1e16 || _burnPercent == 0, 'burn: wut?');
        burnPercent = _burnPercent;
    }

    // Update burnPercent by the previous dev.
    function getBurnPercent() external view returns (uint256){
        return burnPercent;
    }
}