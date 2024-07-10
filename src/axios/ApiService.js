import axios from "axios";

export const filteredLogs = (url = "/logs/filtered-logs/?status=RUNNING") => {
  return axios({
    url,
    method: "GET",
    baseURL: `${process.env.REACT_APP_API_URL_ADMIN}`,
  });
};
