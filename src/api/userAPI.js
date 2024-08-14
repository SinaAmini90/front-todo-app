import api from "./apiFunctions.js";

async function signin(userData) {
  try {
    const response = await api.post(`/user/signin`, userData);
    return response.data.jwt;
  } catch (error) {
    console.error("Error signin user:", error);
    throw error;
  }
}

export { signin };
