/** @format */

describe("Museum marketplace", function () {
  it("Should create and execute market sales", async function () {
    /* deploy the marketplace */
    const Museum = await ethers.getContractFactory("Museum");
    const museum = await Museum.deploy();
    await museum.deployed();

    let listingPrice = await museum.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits("0.0001", "ether");

    /* create two tokens */
    await museum.createToken(
      "https://bafybeiaecj6ntfymwbvkhzj7dc26hukk4jc63fipakrzlixk5blizxk5ci.ipfs.nftstorage.link/monalisa.jpg",
      auctionPrice,
      { value: listingPrice }
    );
    await museum.createToken(
      "https://bafybeiejbvjsmg2bshwnexn3cxoyxtbvnxymgfpwfeoi5ns47ay4e2zrpq.ipfs.nftstorage.link/art8.jpg",
      auctionPrice,
      { value: listingPrice }
    );

    const [_, buyerAddress] = await ethers.getSigners();

    /* execute sale of token to another user */
    await museum
      .connect(buyerAddress)
      .createMarketSale(1, { value: auctionPrice });

    /* resell a token */
    await museum
      .connect(buyerAddress)
      .resellToken(1, auctionPrice, { value: listingPrice });

    /* query for and return the unsold items */
    items = await museum.fetchMarketItems();
    items = await Promise.all(
      items.map(async (i) => {
        const tokenUri = await museum.tokenURI(i.tokenId);
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri,
        };
        return item;
      })
    );
    console.log("items: ", items);
  });
});
