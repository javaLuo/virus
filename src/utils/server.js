import axios from "axios";
import qs from "qs";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "https://www.dnavote.com"
    : window.location.origin;

axios.defaults.withCredentials = false;

export default class ApiService {
  static post(url, bodyObj = {}) {
    return axios({
      url: `${baseUrl}/${url}`,
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      data: JSON.stringify(bodyObj),
    });
  }
  static get(url, params) {
    return axios({
      url: `${baseUrl}/${url}?${qs.stringify(params)}`,
      methods: "get",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
  }
}
