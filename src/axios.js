import axios from "axios";

const instance = axios.create({
  baseURL: "https://chatapp-backend00.herokuapp.com/api",
});

export default instance;
