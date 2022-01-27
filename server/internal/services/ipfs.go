package services

import (
	"encoding/json"

	"weekend.side/GolangWithReactApp/server/internal/config"
	"weekend.side/GolangWithReactApp/server/internal/external"
)

func UploadToIPFS(body map[string]interface{}) (map[string]interface{}, error) {
	headers := map[string]string{
		"Authorization": "Bearer " + config.JWT,
		"Content-Type":  "application/json",
	}

	bodyBytes, err := external.ExecuteRequest(config.PINATA_URL+"pinning/pinJSONToIPFS", "POST", body, headers)
	if err != nil {
		return nil, err
	}

	var resp map[string]interface{}
	err = json.Unmarshal(bodyBytes, &resp)
	if err != nil {
		return nil, err
	}

	return resp, nil
}
