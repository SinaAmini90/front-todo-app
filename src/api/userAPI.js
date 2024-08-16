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

async function createUser(userData) {
  try {
    const response = await api.post(`/user/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Error signup user:", error);
    throw error;
  }
}

export { signin, createUser };
