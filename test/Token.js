const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Token contract", function () {
  async function deployContractFixture() {
    const[owner, addr1, addr2] = await ethers.getSigners();
    const hardhatToken = await ethers.deployContract("Token");

    return {hardhatToken, owner, addr1, addr2};
  }

  
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const {hardhatToken, owner} = await loadFixture(deployContractFixture);

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    const {hardhatToken, owner, addr1, addr2} = await loadFixture(deployContractFixture);

    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(0);
  });
});