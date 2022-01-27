package controller

import (
	"fmt"

	"weekend.side/GolangWithReactApp/server/internal/constants"

	"github.com/gin-gonic/gin"
	"weekend.side/GolangWithReactApp/server/internal/dtos"
	"weekend.side/GolangWithReactApp/server/internal/services"
)

func MintBlog(c *gin.Context) {
	blog := dtos.MintBlog{}
	address, err := blog.HandleRequest(c)
	if err != nil {
		fmt.Print(err)
		c.JSON(200, map[string]interface{}{
			"success": false,
			"data":    nil,
			"error":   err,
		})
		return
	}

	resp, err := services.MintBlog(c, &blog, address)
	if err != nil {
		c.JSON(200, map[string]interface{}{
			"success": false,
			"data":    nil,
			"error":   err,
		})
		return
	}

	c.JSON(200, map[string]interface{}{
		"success": true,
		"data":    resp,
	})
}

func AuctionNFT(c *gin.Context) {
	var mp map[string]interface{}
	err := c.BindJSON(&mp)
	if err != nil {
		fmt.Print(err)
	}
	c.JSON(200, map[string]interface{}{
		"success": true,
		"data":    nil,
	})
}

func CrowdfundNFT(c *gin.Context) {
	var mp map[string]interface{}
	err := c.BindJSON(&mp)
	if err != nil {
		fmt.Print(err)
	}
	c.JSON(200, map[string]interface{}{
		"success": true,
		"data":    nil,
	})
}

func FetchOffersOnNFT(c *gin.Context) {
	var mp map[string]interface{}
	err := c.BindJSON(&mp)
	if err != nil {
		fmt.Print(err)
	}
	c.JSON(200, map[string]interface{}{
		"success": true,
		"data":    nil,
	})
}

func TransferNFT(c *gin.Context) {
	var mp map[string]interface{}
	err := c.BindJSON(&mp)
	if err != nil {
		fmt.Print(err)
	}
	c.JSON(200, map[string]interface{}{
		"success": true,
		"data":    nil,
	})
}

func DraftBlog(c *gin.Context) {
	var mp map[string]interface{}
	err := c.BindJSON(&mp)
	if err != nil {
		fmt.Print(err)
	}
	c.JSON(200, map[string]interface{}{
		"success": true,
		"data":    nil,
	})
}

func UpdateDraft(c *gin.Context) {
	var mp map[string]interface{}
	err := c.BindJSON(&mp)
	if err != nil {
		fmt.Print(err)
	}
	c.JSON(200, map[string]interface{}{
		"success": true,
		"data":    nil,
	})
}

func FetchDraftBlogById(c *gin.Context) {
	var mp map[string]interface{}
	err := c.BindJSON(&mp)
	if err != nil {
		fmt.Print(err)
	}
	c.JSON(200, map[string]interface{}{
		"success": true,
		"data":    nil,
	})
}

func FetchDraftBlogs(c *gin.Context) {
	var mp map[string]interface{}
	err := c.BindJSON(&mp)
	if err != nil {
		fmt.Print(err)
	}
	c.JSON(200, map[string]interface{}{
		"success": true,
		"data":    nil,
	})
}

func DeleteDraftBlogById(c *gin.Context) {
	var mp map[string]interface{}
	err := c.BindJSON(&mp)
	if err != nil {
		fmt.Print(err)
	}
	c.JSON(200, map[string]interface{}{
		"success": true,
		"data":    nil,
	})
}

func FetchAllOwnedBlogs(c *gin.Context) {
	fmt.Print("hi fetching nfts")
	address := c.GetHeader(constants.XWalletAddress)
	resp, err := services.FetchMintedBlogs(c, address)
	if err != nil {
		c.JSON(200, map[string]interface{}{
			"success": false,
			"data":    nil,
			"error":   err,
		})
		return
	}

	c.JSON(200, map[string]interface{}{
		"success": true,
		"data":    resp,
	})
}

func SponsorAuthor(c *gin.Context) {
	sponsor := dtos.Sponsor{}
	address, err := sponsor.HandleRequest(c)
	if err != nil {
		fmt.Print(err)
		c.JSON(200, map[string]interface{}{
			"success": false,
			"data":    nil,
			"error":   err,
		})
		return
	}

	resp, err := services.SponsorAuthor(c, sponsor.ProfileAddress, address)
	if err != nil {
		c.JSON(200, map[string]interface{}{
			"success": false,
			"data":    nil,
			"error":   err,
		})
		return
	}

	c.JSON(200, map[string]interface{}{
		"success": true,
		"data":    resp,
	})
}

func RaiseOffer(c *gin.Context) {
	var mp map[string]interface{}
	err := c.BindJSON(&mp)
	if err != nil {
		fmt.Print(err)
	}
	c.JSON(200, map[string]interface{}{
		"success": true,
		"data":    nil,
	})
}
