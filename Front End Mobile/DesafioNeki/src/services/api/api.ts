import axios from "axios";

export const DesafioNekiApi = axios.create({
  baseURL: "https://8847-2804-d41-bf03-d000-c9ff-2fd-ac83-5fa7.sa.ngrok.io/",
  headers: {
    "Content-Type": "application/json",
  },
});
