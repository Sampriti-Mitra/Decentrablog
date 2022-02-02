package dtos

import (
	"github.com/Sampriti-Mitra/Decentrablog/server/internal/constants"
	"github.com/gin-gonic/gin"
)

type Blog struct {
	Title      string `json:"title"`
	Content    string `json:"content"`
	SubHeading string `json:"subheading"`
	Tags       string `json:"tags"`
}

type MintBlog struct {
	Blog
	Copies int `json:"copies"`
}

type Sponsor struct {
	ProfileAddress string `json:"profile_address"`
}

func (blog *MintBlog) HandleRequest(c *gin.Context) (string, error) {
	address := c.GetHeader(constants.XWalletAddress)
	err := c.BindJSON(blog)
	if err != nil {
		return "", err
	}
	return address, nil
}

func (sponsor Sponsor) HandleRequest(c *gin.Context) (string, error) {
	address := c.GetHeader(constants.XWalletAddress)
	err := c.BindJSON(sponsor)
	if err != nil {
		return "", err
	}
	return address, nil
}
