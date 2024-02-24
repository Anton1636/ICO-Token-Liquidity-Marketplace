//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Liquidity {
    address public admin;

    mapping(address => LiquididtyInfo[]) public liquididties;

    uint256 public liquidityID;

    struct LiquididtyInfo {
        uint256 id;
        address owner;
        string tokenA;
        string tokenB;
        string tokenA_Address;
        string tokenB_Address;
        string poolAddress;
        string network;
        string transactionHash;
        uint256 timeCreated;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addLiquidity(
        string memory _tokenA,
        string memory _tokenB,
        string memory _tokenA_Address,
        string memory _tokenB_Address,
        string memory _poolAddress,
        string memory _network,
        string memory _transactionhash
    ) external {
        liquidityID++;

        uint256 currentLiquididtyID = liquidityID;

        liquididties[msg.sender].push(
            LiquididtyInfo({
                id: currentLiquididtyID,
                owner: msg.sender,
                tokenA: _tokenA,
                tokenB: _tokenB,
                tokenA_Address: _tokenA_Address,
                tokenB_Address: _tokenB_Address,
                poolAddress: _poolAddress,
                network: _network,
                transactionHash: _transactionhash,
                timeCreated: block.timestamp
            })
        );
    }

    function getAllLiquidity(
        address _address
    ) public view returns (LiquididtyInfo[] memory) {
        return liquididties[_address];
    }

    function transferEther() external payable {
        require(msg.value > 0, "Amount should be greater than 0");

        (bool success, ) = admin.call{value: msg.value}("");

        require(success, "Transfer failed");
    }
}
