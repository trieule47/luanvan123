import axios from "react-native-axios";
import * as Config from "./../constants/Config";

export default function callApi(endpoint, method = "GET", body, accessToken) {
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: body,
    headers:
      accessToken != null
        ? {
            'Content_Type': "application/json",
            Accept: "application/json",
            Authorization: "Bearer "+accessToken,
          }
        : null,
  }).catch(function (error) {
    console.log(error);
  });
}
