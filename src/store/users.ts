import {defineStore} from "pinia";

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: {}, // Initial user state is null
    }),
    actions: {
        setUsers(page, users) {
            this.users[page] = users
        },
    },
    getters: {
        getUsers(): object | null {
            return this.users
        },
        getUsersByPage: (state) => (page) => {
            // Replace this with your logic to find data by id
            return state.users[page];
        },
    },
})