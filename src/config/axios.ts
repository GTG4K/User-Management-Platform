import axios, {AxiosInstance} from "axios";

const instance: AxiosInstance = axios.create({
    baseURL: "https://dummyjson.com/",
    headers: {
        Accept: "application/json",
    },
});

export default instance
