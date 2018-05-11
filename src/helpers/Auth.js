import AppConst from "../config/AppConst"

export const setAccessToken = accessToken => {
  localStorage.setItem(AppConst.accessTokenKey, accessToken)
}

export const getAccessToken = () => localStorage.getItem(AppConst.accessTokenKey)

export const logout = () => {
  localStorage.clear()
}

export const isLoggedIn = () => {
  const accessToken = getAccessToken() || ""
  return accessToken.length > 0
}
