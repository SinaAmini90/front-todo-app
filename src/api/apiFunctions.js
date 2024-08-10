import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoic2luYWFhMTUyIiwiaWF0IjoxNzIzMjY0MDAyfQ.FXj-cUO12rxk4M_3Y-8-PHJI29QmQTk_OpCVfZLJBuM",
  },
});

export default api;
