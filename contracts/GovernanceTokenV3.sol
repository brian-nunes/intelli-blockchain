// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";


interface ISwapRouter {
    struct ExactInputSingleParams {
        address tokenIn;
        address tokenOut;
        uint24 fee;
        address recipient;
        uint256 deadline;
        uint256 amountIn;
        uint256 amountOutMinimum;
        uint160 sqrtPriceLimitX96;
    }

    function exactInputSingle(ExactInputSingleParams calldata params) external payable returns (uint256 amountOut);
}

contract GovernanceToken is ERC20, ERC20Permit, ERC20Votes {

    ISwapRouter public immutable swapRouter;
    ERC20 private constant BTGDOL = ERC20(0x0172ae13E3583BF565957095D27caede3Abb172e);

    mapping(address=>uint) stakedAmount;
    uint public stakeLimit = 2000000000;
    address public governanceContract = address(0);
    uint[4] private investPercentage; // decimals = 15
    uint[4] private prices = [28839 ether, 1903 ether, 77000000 gwei, 1 ether];
    address[4] private investedTokens;

    constructor() ERC20("Leviathan", "LEVI") ERC20Permit("Leviathan") {
       swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
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

    function setFundTokens(address[4] calldata _investedTokens) external{
        require(_msgSender() == governanceContract, "Only Governance.");
        investedTokens = _investedTokens;
    }

    function rearrangeFunds(uint _percentage1, uint _percentage2, uint _percentage3, uint _percentage4) external{
        require(_msgSender() == governanceContract, "Only Governance.");
        uniswapTrade(investedTokens[0], investedTokens[1], 500, _percentage1*prices[0]);
        uniswapTrade(investedTokens[1], investedTokens[2], 500, _percentage2*prices[1]);
        uniswapTrade(investedTokens[2], investedTokens[3], 500, _percentage3*prices[2]);
        uniswapTrade(investedTokens[3], investedTokens[0], 500, _percentage4*prices[3]);
    }

    function decimals() public view override returns (uint8) {
        return 18;
    }

    function uniswapTrade(address _tokenIn, address _tokenOut, uint24 _fee, uint _amountIn) internal returns(uint amountOut){
        ISwapRouter.ExactInputSingleParams memory params;
        params.tokenIn = _tokenIn;
        params.tokenOut = _tokenOut;
        params.fee = _fee;
        params.recipient = address(this);
        params.deadline = block.timestamp;
        params.amountIn = _amountIn;
        params.amountOutMinimum = 0;
        params.sqrtPriceLimitX96 = 0;
        amountOut = swapRouter.exactInputSingle(params);
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
