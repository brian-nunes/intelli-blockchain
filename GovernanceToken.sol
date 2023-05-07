// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20, ERC20Permit, ERC20Votes {

    ERC20 private constant BTGDOL = ERC20(0x0172ae13E3583BF565957095D27caede3Abb172e);

    mapping(address=>uint) stakedAmount;
    uint public stakeLimit;
    address public governanceContract = address(0);

    constructor() ERC20("Leviathan", "LEVI") ERC20Permit("Leviathan") {
    }

    function stake(uint _amount) external{
        require(_amount > 0, "Amount cannot be zero.");
        require(stakedAmount[_msgSender()] + _amount <= stakeLimit, "Stake amount exceeds limit.");
        BTGDOL.transferFrom(_msgSender(), address(this), _amount);
        stakedAmount[_msgSender()] += _amount;
        _mint(_msgSender(), _amount);
    }

    function unstake(uint _amount) external{
        require(_amount > 0, "Amount cannot be zero.");
        require(stakedAmount[_msgSender()] >= _amount, "Not enough funds on stake.");
        _burn(_msgSender(), _amount);
        stakedAmount[_msgSender()] -= _amount;
        BTGDOL.transfer(_msgSender(), _amount);
    }

    function setGovernanceContract(address _governanceContract) external{
        require(governanceContract == address(0), "Governance Contract Address already set.");
        governanceContract = _governanceContract;
    }

    function setStakeLimit(uint _stakeLimit) external{
        require(_msgSender() == governanceContract, "Only Governance.");
        stakeLimit = _stakeLimit;
    }

    // The functions below are overrides required by Solidity.

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}
