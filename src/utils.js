const getIdFromToken = token => {
  if (token) {
    try {
      return JSON.parse(atob(token.split('.')[1])).id
    } catch (error) {
      // ignore
    }
  }
  return null;
}

export default getIdFromToken;