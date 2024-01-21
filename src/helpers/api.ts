import axios from "axios";

// API for client frontend operations.
export const frontendApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// API for Next server-side operations.
export const privateApi = axios.create({
    baseURL: process.env.PRIVATE_BACKEND_URL,
});
