import {instance, multipartInstance} from "../config/axios.ts";

async function getUsers(page: number = 1) {
    const limit = 12 // users per page
    const skip = (page - 1) * limit

    try {
        const response = await instance.get(`users?limit=${limit}&skip=${skip}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function addUser(data) {
    try {
        const response = await multipartInstance.post(`users/add`, data);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getUserById(id: number) {
    try {
        const response = await instance.get(`users/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function deleteUserById(id: number) {
    try {
        const response = await instance.delete(`users/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export {getUsers, addUser, getUserById, deleteUserById}