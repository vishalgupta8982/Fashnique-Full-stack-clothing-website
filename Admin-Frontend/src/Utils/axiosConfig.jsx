 

import Cookies from 'js-cookie';
export const config = () => {
  const token = Cookies.get('fashniqueAdminToken');
  console.log(token)
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = new Date(decodedToken.exp * 1000);
    const expireTimeInMs = expirationTime.getTime()
    console.log('Token expiration time:', expireTimeInMs, Date.now());
    if (Date.now() > expireTimeInMs) {
      Cookies.remove('token');
    }
  } else {
    console.error('Token not found in cookies');
  }
  const Config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };

  return Config;
};
