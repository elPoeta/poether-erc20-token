// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract PoetherToken is Ownable, ERC20Capped, ERC20Burnable {
    uint256 private s_blockReward;

    constructor(
        uint256 _supply,
        uint256 _cap,
        uint256 _reward
    ) ERC20("PoetherToken", "PHT") ERC20Capped(_cap * (10**decimals())) {
        _mint(owner(), (_supply * (10**decimals())));
        s_blockReward = _reward * (10**decimals());
    }

    function _mint(address account, uint256 amount)
        internal
        virtual
        override(ERC20Capped, ERC20)
    {
        require(
            ERC20.totalSupply() + amount <= cap(),
            "ERC20Capped: cap exceeded"
        );
        super._mint(account, amount);
    }

    function _mintMinerReward() internal {
        _mint(block.coinbase, s_blockReward);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        if (
            from != address(0) &&
            to != block.coinbase &&
            block.coinbase != address(0)
        ) {
            _mintMinerReward();
        }
        super._beforeTokenTransfer(from, to, amount);
    }

    function destroy() public onlyOwner {
        selfdestruct(payable(owner()));
    }

    function setBlockReward(uint256 reward) public onlyOwner {
        s_blockReward = reward * (10**decimals());
    }

    function getBlockReward() public view returns (uint256) {
        return s_blockReward;
    }
}
