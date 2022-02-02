package services

import (
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
)

func SponsorAuthor(ctx *gin.Context, profileAddress string, userAddress string) (interface{}, error) {
	return nil, nil
}

func BuyNFT(ctx *gin.Context, addressFrom string, addressTo string, id string) (interface{}, error) {
	// after transaction, transfer NFT
	tokenId, err := strconv.Atoi(id)
	if err != nil {
		return nil, err
	}
	fmt.Print("transferring from ", addressFrom, "to ", addressTo)
	return TransferNFT(int64(tokenId), addressFrom, addressTo)
}
