import {instance, multipartInstance} from "../config/axios.ts";

async function getUsers(page: number = 1) {
    const usersPerPage = 12
    const skip = (page - 1) * usersPerPage

    try {
        const response = await instance.get(`users?limit=${usersPerPage}&skip=${skip}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function addUser(data: FormData) {
    try {
        const response = await multipartInstance.post(`users/add`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function editUser(userID:number ,data: FormData) {
    try {
        const response = await multipartInstance.patch(`users/${userID}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getUserById(id: number) {
    try {
        const response = await instance.get(`users/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function deleteUserById(id: number) {
    try {
        const response = await instance.delete(`users/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export {getUsers, addUser, getUserById, editUser, deleteUserById}