package external

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strings"
)

func ExecuteRequest(urls string, method string, requests interface{}, headers map[string]string) ([]byte, error) {

	reqJSON, err := json.Marshal(requests)

	req, _ := http.NewRequest(method, urls, strings.NewReader(string(reqJSON)))

	for key, val := range headers {
		req.Header.Set(key, val)
	}

	cli := &http.Client{Transport: http.DefaultTransport}

	response, err := cli.Do(req)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)

	if err != nil {
		return nil, err
	}

	return body, nil

}

//func SlackWebhook(req interface{}) ([]byte, error) {
//	slackUrl := ""
//	token := ""
//
//	bearer := "Bearer " + token
//
//	headers := map[string]string{
//		"Authorization": bearer,
//		"Content-Type":  "application/json",
//	}
//
//	request := req.(map[string]interface{})
//
//	msg := request["text"]
//	channel := request["channel"]
//	ts := request["ts"]
//	user := request["user"]
//
//	return ExecuteRequest(slackUrl, "POST", map[string]interface{}{
//		"text":      "<@" + user.(string) + ">, what do you mean " + msg.(string) + "? :rage:",
//		"channel":   channel.(string),
//		"thread_ts": ts.(string),
//		"username":  "AngryBots",
//		"icon_url":  "https://image.flaticon.com/icons/png/512/528/528076.png",
//	}, headers)
//}
