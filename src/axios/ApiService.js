import axios from "axios";

export const filteredLogs = (url = "/logs/filtered-logs/?status=RUNNING") => {
  return axios({
    url,
    method: "GET",
    baseURL: "http://localhost:8000",
  });
};
