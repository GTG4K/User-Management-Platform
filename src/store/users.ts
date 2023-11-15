import {defineStore} from "pinia";
import placeholder from "../assets/img/placeholder-image.png"

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: {}, // Initial user state is null
    }),
    actions: {
        setUsers(page, users) {
            this.users[page] = users
        },
        addUser(user) {
            if (!this.users[1]) this.users[1] = []
            user.image = placeholder
            this.users[1].push(user)
        },
        deleteUser(userID) {
            for (let page in this.users) {
                if (this.users.hasOwnProperty(page)) {
                    const currentPage = this.users[page]
                    const index = currentPage.findIndex(user => user.id === userID)
                    if (index !== -1) {
                        currentPage.splice(index, 1)
                        return
                    }
                }
            }
        }
    },
    getters: {
        getUsers(): object | null {
            return this.users
        },
        getUsersByPage: (state) => (page: number) => {
            // Replace this with your logic to find data by id
            return state.users[page];
        },
        getUserById: (state) => (id: number) => {
            const usersArray = [];
            for (const key in state.users) {
                if (state.users.hasOwnProperty(key)) {
                    usersArray.push(...state.users[key]);
                }
            }
            return usersArray.find(user => user.id === id)
        },
        getUsersBySearch: (state) => (search) => {
            const usersArray = [];
            for (const key in state.users) {
                if (state.users.hasOwnProperty(key)) {
                    usersArray.push(...state.users[key]);
                }
            }

            return usersArray.filter(user => user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                user.lastName.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
            ).slice(0,5)
        }
    },
})