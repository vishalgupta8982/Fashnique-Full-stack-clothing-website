const getTokenFromLocalStorage = localStorage.getItem('User')
  ? JSON.parse(localStorage.getItem('User'))
  : null
export const Config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token.token : ''}`,
  },
}
