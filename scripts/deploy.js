/** @format */

const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Museum = await hre.ethers.getContractFactory("Museum");
  const museum_add = await Museum.deploy();
  await museum_add.deployed();
  console.log("museum_add deployed to:", museum_add.address);

  fs.writeFileSync(
    "./config.js",
    `
  export const marketplaceAddress = "${museum_add.address}"
  `
  );

  const data = {
    address: museum_add.address,
    abi: JSON.parse(museum_add.interface.format("json")),
  };

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync("./Marketplace.json", JSON.stringify(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
