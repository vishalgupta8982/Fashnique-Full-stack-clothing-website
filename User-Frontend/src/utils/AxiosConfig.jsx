import Cookies from 'js-cookie';
export const Config = () => {
  const token = Cookies.get('token');
  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',  
    },
  };

  return config;
};
