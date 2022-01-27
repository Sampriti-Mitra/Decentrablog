package services

import (
	"encoding/json"
	"errors"
	"fmt"
	"strings"

	"weekend.side/GolangWithReactApp/server/internal/external"

	"github.com/gin-gonic/gin"
	"weekend.side/GolangWithReactApp/server/internal/dtos"
)

func MintBlog(ctx *gin.Context, blog *dtos.MintBlog, address string) (interface{}, error) {
	ipfsResp, err := UploadToIPFS(map[string]interface{}{
		"title":      blog.Title,
		"content":    blog.Content,
		"subheading": blog.SubHeading,
		"tags":       blog.Tags,
	})
	if err != nil {
		return nil, err
	}

	fmt.Print(ipfsResp)

	ipfsHash, ok := ipfsResp["IpfsHash"]
	if !ok {
		return nil, errors.New("Some error in ipfs upload")
	}
	nftMetaData, nftErr := MintExclusiveNFT(ipfsHash.(string), address)
	if nftErr != nil {
		return nil, nftErr
	}

	fmt.Print(nftMetaData)

	return nftMetaData, nil

}

func FetchMintedBlogs(ctx *gin.Context, address string) (interface{}, error) {
	nftDataArray, nftErr := FetchAllNFTs(address)
	if nftErr != nil {
		return nil, nftErr
	}

	blogs := []map[string]interface{}{}

	for _, nftData := range nftDataArray {
		if !strings.Contains(nftData.Image, "gateway.pinata.cloud") {
			continue
		}
		bodyBytes, err := external.ExecuteRequest(nftData.Image, "GET", nil, nil)
		if err != nil {
			continue
			//return nil, err
		}
		var blog map[string]interface{}
		err = json.Unmarshal(bodyBytes, &blog)
		if err != nil {
			continue
			//return nil, err
		}
		blogs = append(blogs, blog)
	}

	return blogs, nil
}
