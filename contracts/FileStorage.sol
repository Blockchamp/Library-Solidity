// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;
pragma experimental ABIEncoderV2;

contract Filestorage {
    
    address userAddress;
    struct Cid{
        string cid;
    }
  
    mapping(address => Cid[]) files;


    function store(address _userAddress, string memory _cid) public {
        files[_userAddress].push(Cid(_cid));
    }

    function retrieve(address _userAddress) public view returns(Cid[] memory){
        return files[_userAddress];
    }

  

}