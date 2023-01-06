import axios from "axios";

export const DesafioNekiApi = axios.create({
        baseURL: "https://fbe7-177-82-128-240.sa.ngrok.io",
        headers: {
            "Content-Type": "application/json",
        },
    });