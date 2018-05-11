export const isProduction = process.env.NODE_ENV === "production"
const AppConfig = {
  baseURL: isProduction ? process.env.REACT_APP_BASE_URL : "http://localhost:4000",
  userKey: "currentUser",
  accessTokenKey: "accessToken",
  pollingInterval: 10000, // 10 seconds
}

export default AppConfig
