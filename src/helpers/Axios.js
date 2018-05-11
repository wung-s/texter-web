import axios from "axios"
import { getAccessToken } from "../helpers/Auth"
import AppConfig from "../config/AppConst"

export default () => {
  const instance = axios.create({
    baseURL: `${AppConfig.baseURL}`,
    timeout: 60000,
    headers: {
      Authorization: `${getAccessToken()}`,
      "Content-Type": "application/json",
    },
  })

  return instance
}
