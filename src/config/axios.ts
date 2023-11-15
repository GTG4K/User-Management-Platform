import axios, {AxiosInstance} from "axios";

const instance: AxiosInstance = axios.create({
    baseURL: "https://dummyjson.com/",
    headers: {
        Accept: "application/json",
    },
});

const multipartInstance: AxiosInstance = axios.create({
    baseURL: "https://dummyjson.com/",
    headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
    },
});

export {instance, multipartInstance}
