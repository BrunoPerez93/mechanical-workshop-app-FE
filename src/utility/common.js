export const logout = (navigate) => {
  localStorage.removeItem('token');
  navigate('/login');
};

export const apiCall = async (path, method, body, isWithoutToken) =>{
 
  return fetch(
    `${import.meta.env.VITE_API_URL}${path}`,
    {
      method,
      body,
      headers: {
        "Content-Type": "application/json",
        ...(!isWithoutToken && { "Authorization": `Bearer ${localStorage.getItem('token')}` })
      },
    }
  )}