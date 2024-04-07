import Cookies from 'js-cookie'
export const config = () => {
  const token = Cookies.get('fashniqueAdminToken')
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]))
    const expirationTime = new Date(decodedToken.exp * 1000)
    const expireTimeInMs = expirationTime.getTime()
    if (Date.now() > expireTimeInMs) {
      Cookies.remove('token')
    }
  } else {
    console.error('Token not found in cookies')
  }
  const Config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  }

  return Config
}
