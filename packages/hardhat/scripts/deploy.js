// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// async function main() {
//     const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//     const SIXTY_SECS = 60;
//     const unlockTime = currentTimestampInSeconds + SIXTY_SECS;

//     const lockedAmount = hre.ethers.utils.parseEther("0.0001");

//     const Lock = await hre.ethers.getContractFactory("Lock");
//     const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//     console.log(`Unlock Time: ${unlockTime}`);

//     await lock.deployed();

//     console.log(
//         `Lock with 0.0001 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
//     );
// }


async function main() {
    // const miniPayNFT = await ethers.deployContract("MiniPay", [
    //   "0x0D6Dc2f182Eafa687090F95466d5368726C1ca45",
    // ]);
  
    // await miniPayNFT.waitForDeployment();
  
    // console.log("Minipay NFT address - " + (await miniPayNFT.getAddress()));

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const MiniPay = await ethers.getContractFactory("MiniPay");
    const cUSDAddress = "0x..."; // Replace with the actual cUSD token address
    const miniPay = await MiniPay.deploy(cUSDAddress);

    await miniPay.deployed();

    console.log("MiniPay deployed to:", miniPay.address);
  }

  

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
