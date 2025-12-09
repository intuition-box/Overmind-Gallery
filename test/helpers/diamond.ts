// Helper functions for GBM testing
// Note: ethers is assumed to be available globally in Hardhat test context
declare const ethers: any;

export async function deployMockTokens(): Promise<{
  erc20: any;
  erc721: any;
  erc1155: any;
}> {
  const MockERC20 = await ethers.getContractFactory("MockERC20");
  const erc20 = await MockERC20.deploy("MockToken", "MTK");
  await erc20.waitForDeployment();

  const MockERC721 = await ethers.getContractFactory("MockERC721");
  const erc721 = await MockERC721.deploy("MockNFT", "MNFT");
  await erc721.waitForDeployment();

  const MockERC1155 = await ethers.getContractFactory("MockERC1155");
  const erc1155 = await MockERC1155.deploy("https://mock.uri/{id}.json");
  await erc1155.waitForDeployment();

  return { erc20, erc721, erc1155 };
}