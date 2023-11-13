import {defineStore} from "pinia";

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: null, // Initial user state is null
    }),
    actions: {
        setUsers(users: object) {
            this.users = users
        }
    },
    getters: {
        getUsers(): object | null {
            return this.users
        }
    },
})