export const getTokenFromLocalStorage = localStorage.getItem('User')
  ? JSON.parse(localStorage.getItem('User'))
  : null
