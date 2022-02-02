package routing

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/GolangWithReactApp/server/internal/controller"
)

func SetUpRouter() {
	router := gin.Default()

	// Serve frontend static files
	// router.Use(static.Serve("/", static.LocalFile("./views", true)))
	router.Use(static.Serve("/", static.LocalFile("./web", true)))

	// Setup route group for the API
	api := router.Group("/api")

	SetUpRoutes(api)
	// Start and run the server
	router.Run()
}

func SetUpRoutes(api *gin.RouterGroup) {
	api.GET("/", controller.Health)

	api.POST("/blogs", controller.MintBlog)

	api.POST("/auction/:addressId/:mintId", controller.AuctionNFT)

	api.POST("/crowdfund/:addressId/:mintId", controller.CrowdfundNFT)

	api.GET("/blogs/:blogId/offer", controller.FetchOffersOnNFT)

	api.GET("accounts/:accountId/blogs", controller.FetchAllOwnedBlogs)

	api.GET("/blogs", controller.FetchAllBlogs)

	api.POST("/transfer/blogs/:blogId/accept/:accountId", controller.TransferNFT)

	api.POST("/draft/blog", controller.DraftBlog)

	api.PUT("/draft/blog/:blogId", controller.UpdateDraft)

	api.GET("/draft/blog/:blogId", controller.FetchDraftBlogById)

	api.GET("/draft/blogs", controller.FetchDraftBlogs)

	api.DELETE("draft/blog/:blogId", controller.DeleteDraftBlogById)

	api.POST("/sponsor", controller.SponsorAuthor)

	api.POST("/blogs/:blogId/offer", controller.RaiseOffer)

}
