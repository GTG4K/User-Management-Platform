import instance from "../config/axios.ts";
async function getUsers(page: number = 1) {
    const limit = 12 // users per page
    const skip = page * limit

    try {
        const response = await instance.get(`users?limit=${limit}&skip=${skip}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export {getUsers}