package services

import (
	"fmt"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/nftlabs/nftlabs-sdk-go/pkg/nftlabs"
	"weekend.side/GolangWithReactApp/server/internal/config"
)

func getThirdWebInstance() (*nftlabs.Sdk, error) {
	chainRpcUrl := "https://rpc-mumbai.maticvigil.com/" // change this

	client, err := ethclient.Dial(chainRpcUrl)
	if err != nil {
		log.Fatal(err)
	}

	sdk, err := nftlabs.NewSdk(client, &nftlabs.SdkOptions{PrivateKey: config.PRIVATE_KEY})
	if err != nil {
		log.Print("Some error in getting sdk", err)
		return nil, err
	}

	return sdk, nil
}

func MintExclusiveNFT(ipfsHash string, address string) (*nftlabs.NftMetadata, error) {
	sdk, err := getThirdWebInstance()
	if err != nil {
		log.Print("Some error in getting sdk", err)
		return nil, err
	}

	nftModule, err := sdk.GetNftModule(config.NftContractAddress)
	if err != nil {
		log.Print("Some error in getting nft module", err)
		return nil, err
	}

	metaData, mintErr := nftModule.MintTo(address, nftlabs.MintNftMetadata{
		Name:        "D'Blog - The Decentralized Blog",
		Description: "blog",
		Image:       "https://gateway.pinata.cloud/ipfs/" + ipfsHash,
		Properties:  nil,
	})
	if mintErr != nil {
		log.Print("Some error in minting ", mintErr)
		return nil, mintErr
	}
	log.Print("nft minted to ", metaData.Id)

	return &metaData, nil

}

func FetchNFTById(id int64) (*nftlabs.NftMetadata, error) {
	sdk, err := getThirdWebInstance()
	if err != nil {
		log.Print("Some error in getting sdk", err)
		return nil, err
	}

	// You can get Pack/Marketplace/Collection/Currency contracts the same way
	nftModule, nftFetchErr := sdk.GetNftModule(config.NftContractAddress)
	if nftFetchErr != nil {
		log.Print("Some error in getting nft module", nftFetchErr)
		return nil, nftFetchErr
	}

	nftMod, nftFetchErr := nftModule.Get(big.NewInt(id))
	if nftFetchErr != nil {
		log.Print("Some error in getting nft module", nftFetchErr)
		return nil, nftFetchErr
	}

	fmt.Print(nftMod)

	return &nftMod, nil
}

func FetchAllNFTs(address string) ([]nftlabs.NftMetadata, error) {
	sdk, err := getThirdWebInstance()
	if err != nil {
		log.Print("Some error in getting sdk", err)
		return nil, err
	}
	// You can get Pack/Marketplace/Collection/Currency contracts the same way
	nftModule, nftFetchErr := sdk.GetNftModule(config.NftContractAddress)
	if nftFetchErr != nil {
		log.Print("Some error in getting nft module", nftFetchErr)
		return nil, nftFetchErr
	}

	return nftModule.GetOwned(address)
}

func SendTransaction(profileAddress string, userAddress string, amount int) {

}
