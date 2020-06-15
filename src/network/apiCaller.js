import axios from "react-native-axios";
import * as Config from "./../constants/Config";
const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU2ZDUxNGFjNTU1MmNmMTE5ZjMyOTc1YWQzZDJkYTE0NzM0NjAwNzkxMjNjZDU0MWQ5NTMxYmIwZGFkYWQwMGJhYTIxNWZmZWVlMzBjNjQxIn0.eyJhdWQiOiIxIiwianRpIjoiNTZkNTE0YWM1NTUyY2YxMTlmMzI5NzVhZDNkMmRhMTQ3MzQ2MDA3OTEyM2NkNTQxZDk1MzFiYjBkYWRhZDAwYmFhMjE1ZmZlZWUzMGM2NDEiLCJpYXQiOjE1OTE0NjIwNDEsIm5iZiI6MTU5MTQ2MjA0MSwiZXhwIjoxNjIyOTk4MDQxLCJzdWIiOiIxMDQiLCJzY29wZXMiOltdfQ.aFiTFN0vOCd2e1PnRcYLwGA4l3V14ucw1rHn554zJTNbgJbjLxFCN9NJ1g_NOZNziARIG_2ndFwAR9VgWkFc4hYmayWR-0TCehcD4o8tPnKW9Vd7IffJYKkR_2o7KWnLejMUF2qwNaKXf1eweYQ22am7rIM1-8KetMihyK8kBPUevsU7hz74bEz5aOn50DogLOepLDWmtDfqfxaJUlrA25F1C6SSaQFih5YLgjqVrcxzydVltCpbYx6HxvCkWokxPqFe8QjUJZKN4eCi7JlpvPeMeFTBQ-d90NIhZ61TWZwToBN_KzeUy_lwZs8-BFZLNMUr4l_fWzmLdOYN-9FLNjXSLpOg_z77n4urIwupSm1F-dAau_Aeq9TL8n1TOJpJ9lnaHHaB1EgmiPZ9dIHmESVTlClgX7nRVfkahy6xWzzL5WTlmWhV5eWqHs4OQ52zUwAWP8N1rNIyB8TGFTiqpk3SNBaQ_XvrhBB4lhtRKrmg5wir4e8Zb-mORRPtdveyfiNV9Ke6lSI8lSfRGqRVZcrXyKtEpi6wqQjliIMIR7fZ-z39ZipWlBP4ODTJBiW1ynSyAtapINOM29xu18GfUB5ymj7ND2YhLjluxYYGV1-EDN9b4AXYEHw-Jo_4-E0MrgLZUh9srdobjsiIDRtOqGxpQu4FQqXHEYWVAQ5ar_U"

export default function callApi(endpoint, method = "GET", body, accessToken) {
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: body,
    headers:
      accessToken != null
        ? {
            Accept: "application/json",
            Authorization: "Bearer "+accessToken,
          }
        : null,
  }).catch(function (error) {
    console.log(error);
  });
}
