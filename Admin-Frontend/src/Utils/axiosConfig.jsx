const getTokenFromLocalStorage = localStorage.getItem('User')
  ? JSON.parse(localStorage.getItem('User'))
  : null
export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null
        ? getTokenFromLocalStorage.token.token
        : ''
    }`,
  },
}
