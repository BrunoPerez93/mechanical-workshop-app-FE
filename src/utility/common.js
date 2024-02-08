const apiUrl = import.meta.env.VITE_API_URL;

export const logout = () => {
  localStorage.removeItem('token');
  console.log('borro localstorate');
};

export const apiCall = async (path, method, body, queryParams, isWithoutToken) => {
  const url = new URL(`${apiUrl}${path}`);
  if (queryParams)
    Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));

  return fetch(
    url,
    {
      method,
      body,
      headers: {
        "Content-Type": "application/json",
        ...(!isWithoutToken && { "Authorization": `Bearer ${localStorage.getItem('token')}` })
      },
    }
  )
}

export const Roles = {
  Admin: "Admin",
  Management: "Management",
  Mechanic: "Mechanic",
}

export const validateManagementMinimumRole = (role) => [Roles.Admin, Roles.Management].includes(role)

export const validateAdminRole = (role) =>  Roles.Admin === role