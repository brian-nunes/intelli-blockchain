// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.8.3/governance/Governor.sol";
import "@openzeppelin/contracts@4.8.3/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts@4.8.3/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts@4.8.3/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts@4.8.3/governance/extensions/GovernorVotesQuorumFraction.sol";

contract Governance is Governor, GovernorSettings, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction {
    constructor(IVotes _token)
        Governor("Governance")
        GovernorSettings(1 /* 1 block */, 120 /* 1 week */, 0)
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4)
    {}

    // The following functions are overrides required by Solidity.

    function proposeRearrange(uint[4] calldata _percentages) external{
        address[] memory _address;
        _address[0] = address(token);
        uint256[] memory _value;
        _value[0] = 0;
        bytes[] memory _calldata;
        _calldata[0] = abi.encodeWithSignature("rearrangeFunds(uint256,uint256,uint256,uint256)", 
        _percentages[0],
        _percentages[1],
        _percentages[2],
        _percentages[3]);
        string memory _description = "IA Guided Funds Rearrangement.";
        propose(_address, _value, _calldata, _description);
    }

    function votingDelay()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function quorum(uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }
}
