import axios from "axios";
const tokenStorage = JSON.parse(localStorage.getItem("token"));
const bearerToken = tokenStorage ? `Bearer ${tokenStorage.jwt}` : "";
console.log(tokenStorage);

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: bearerToken,
  },
});

export default api;
