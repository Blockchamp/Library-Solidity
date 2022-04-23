const hre = require("hardhat");
const { ethers } = hre;
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);


contract('FileStorage', ([deployer, uploader]) => {
    let Fstorage
  
    before(async () => {
      Fstorage = await FileStorage.deployed()
    })
  
    describe('deployment', async () => {
      it('deploys successfully', async () => {
        const address = await dstorage.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
      })
  
      it('has a name', async () => {
        const name = await Fstorage.name()
        assert.equal(name, 'FileStorage')
      })
    })
  
    describe('file', async () => {
      let result, fileCount
      const filecid = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'
      const fileSize = '1'
      const fileType = 'TypeOfTheFile'
      const fileName = 'NameOfTheFile'
      const fileDescription = 'DescriptionOfTheFile'
  
      before(async () => {
        result = await dstorage.store(filecid, fileSize, fileType, fileName, fileDescription, { from: uploader })
        fileCount = await Fstorage.fileCount()
      })
  
      //check event
      it('upload file', async () => {
        // SUCESS
        assert.equal(fileCount, 1)
        const event = result.logs[0].args
        assert.equal(event.fileId.toNumber(), fileCount.toNumber(), 'Id is correct')
        assert.equal(event.filecid, filecid, 'CID is correct')
        assert.equal(event.fileSize, fileSize, 'Size is correct')
        assert.equal(event.fileType, fileType, 'Type is correct')
        assert.equal(event.fileName, fileName, 'Name is correct')
        assert.equal(event.fileDescription, fileDescription, 'Description is correct')
        assert.equal(event.uploader, uploader, 'Uploader is correct')
  
        // FAILURE: File must have hash
        await Fstorage.store('', fileSize, fileType, fileName, fileDescription, { from: uploader }).should.be.rejected;
  
        // FAILURE: File must have size
        await Fstorage.store(filecid, '', fileType, fileName, fileDescription, { from: uploader }).should.be.rejected;
        
        // FAILURE: File must have type
        await Fstorage.store(filecid, fileSize, '', fileName, fileDescription, { from: uploader }).should.be.rejected;
  
        // FAILURE: File must have name
        await Fstorage.store(filecid, fileSize, fileType, '', fileDescription, { from: uploader }).should.be.rejected;
  
        // FAILURE: File must have description
        await Fstorage.store(filecid, fileSize, fileType, fileName, '', { from: uploader }).should.be.rejected;
      })
  
      //check from Struct
      it('retrieve', async () => {
        const file = await Fstorage.files(fileCount)
        assert.equal(file.fileId.toNumber(), fileCount.toNumber(), 'id is correct')
        assert.equal(file.filecid, filecid, 'CID is correct')
        assert.equal(file.fileSize, fileSize, 'Size is correct')
        assert.equal(file.fileName, fileName, 'Size is correct')
        assert.equal(file.fileDescription, fileDescription, 'description is correct')
        assert.equal(file.uploader, uploader, 'uploader is correct')
      })
    })
  })