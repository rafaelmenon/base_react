import axios from "axios";

const api = axios.create({
  baseURL: "https://back.mercosulsolar.com/v1",
});

export default api;
