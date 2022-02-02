package services

import (
	"encoding/json"
	"errors"
	"fmt"
	"sort"
	"strings"
	"time"
	"unicode"

	"github.com/Sampriti-Mitra/Decentrablog/server/internal/external"

	"github.com/Sampriti-Mitra/Decentrablog/server/internal/dtos"
	"github.com/gin-gonic/gin"
	validation "github.com/go-ozzo/ozzo-validation/v4"
)

func MintBlog(ctx *gin.Context, blog *dtos.MintBlog, address string) (interface{}, error) {
	err := validateBlog(blog)
	if err != nil {
		return nil, err
	}
	ipfsResp, err := UploadToIPFS(map[string]interface{}{
		"title":      blog.Title,
		"content":    blog.Content,
		"subheading": blog.SubHeading,
		"tags":       blog.Tags,
	})
	if err != nil {
		return nil, err
	}

	ipfsHash, ok := ipfsResp["IpfsHash"]
	if !ok {
		return nil, errors.New("Some error in ipfs upload")
	}
	nftMetaData, nftErr := MintExclusiveNFT(ipfsHash.(string), address, blog)
	if nftErr != nil {
		return nil, nftErr
	}

	return nftMetaData, nil

}

func FetchAllMintedBlogs(ctx *gin.Context, address string) (interface{}, error) {

	nftDataArray, nftErr := FetchAllNFTs(address)

	if nftErr != nil {
		return nil, nftErr
	}

	blogs := []map[string]interface{}{}

	for _, nftData := range nftDataArray {
		if !strings.Contains(nftData.Image, "gateway.pinata.cloud") || checkTitle(nftData.Name) { // temp check for valid title to be displayed
			continue
		}
		bodyBytes, err := external.ExecuteRequest(nftData.Image, "GET", nil, nil)
		if err != nil {
			continue
			//return nil, err
		}
		var blogMetaData map[string]interface{}
		err = json.Unmarshal(bodyBytes, &blogMetaData)
		if err != nil {
			continue
			//return nil, err
		}

		if content, ok := blogMetaData["content"]; ok {
			if checkTitle(content.(string)) {
				continue
			}
		}

		blog := map[string]interface{}{}
		blog["metadata"] = blogMetaData
		blog["id"] = nftData.Id
		blog["properties"] = nftData.Properties
		blog["description"] = nftData.Description
		blog["name"] = nftData.Name

		defaultCreatedAt := "26 Jan 2022"
		defaultTs := int64(1643177437)

		if prop, ok := nftData.Properties.(map[string]interface{}); ok {
			blog["address"] = prop["address"]
			if createdAt, exists := prop["created_at"]; exists {
				defaultCreatedAt = getBlogCreationtimeFromUnix(createdAt.(float64))
				defaultTs = int64(createdAt.(float64))
			}
		}

		blog["created_at"] = defaultCreatedAt
		blog["ts"] = defaultTs

		blogs = append(blogs, blog)
	}

	sortBlogs(blogs)

	return blogs, nil
}

func sortBlogs(blogs []map[string]interface{}) {
	sort.SliceStable(blogs, func(i, j int) bool {
		if blogs[i]["ts"].(int64) == blogs[j]["ts"].(int64) {
			return len(blogs[i]["description"].(string)) > len(blogs[j]["description"].(string))
		}
		return blogs[i]["ts"].(int64) > blogs[j]["ts"].(int64)
	})
}

func getBlogCreationtimeFromUnix(createdAt float64) string {
	tim := int64(createdAt)
	year, month, date := time.Unix(tim, 0).Date()
	//hour:=time.Unix(tim,0).Hour()
	//minute:=time.Unix(tim,0).Minute()
	//second:=time.Unix(tim,0).Second()
	return fmt.Sprintf("%d %s %d", date, month.String(), year)
}

func validateBlog(blog *dtos.MintBlog) error {
	err := validation.ValidateStruct(blog,
		// id, required, length 14
		validation.Field(&blog.Title, validation.Required, validation.RuneLength(5, 200), validation.By(checkString(blog.SubHeading))),
		validation.Field(&blog.SubHeading, validation.Required, validation.RuneLength(5, 200), validation.By(checkString(blog.SubHeading))),
		validation.Field(&blog.Content, validation.Required, validation.RuneLength(5, 2200)),
		validation.Field(&blog.Tags, validation.Required),
	)

	if err != nil {
		return err
	}

	return nil
}

func checkString(content string) validation.RuleFunc {
	return func(value interface{}) error {
		for _, r := range content {
			if !unicode.IsLetter(r) {
				return errors.New("Invalid string content")
			}
		}
		return nil
	}
}

func checkTitle(title string) bool {
	return strings.Contains(title, "<") || strings.Contains(title, ">") || title == ""
}
