import {defineStore} from "pinia";
import placeholder from "../assets/img/placeholder-image.png"
import {IUser} from "../ts/user.interface.ts";
import {IUsersState} from "../ts/store/users.interface.ts";

export const useUsersStore = defineStore('users', {
    state: (): IUsersState => ({
        users: {}, // Initial user state is null
        total: 0
    }),
    actions: {
        setTotal(total: number) {
            this.total = total
        },
        setUsers(page: number, users: IUser[]) {
            this.users[page] = users
        },
        addUser(user: IUser) {
            if (!this.users[1]) this.users[1] = []
            user.image = placeholder
            this.users[1].push(user)
        },
        deleteUser(userID: number) {
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
        getTotalUsers(): number {
            return this.total
        },
        getUsersByPage: (state) => (page: number): IUser[] => {
            // Replace this with your logic to find data by id
            return state.users[page];
        },
        getUserById: (state) => (id: number): IUser | undefined => {
            const usersArray = [];
            for (const key in state.users) {
                if (state.users.hasOwnProperty(key)) {
                    usersArray.push(...state.users[key]);
                }
            }
            return usersArray.find(user => user.id === id)
        },
        getUsersBySearch: (state) => (search: string) => {
            const usersArray: IUser[] = [];
            for (const key in state.users) {
                if (state.users.hasOwnProperty(key)) {
                    usersArray.push(...state.users[key]);
                }
            }

            return usersArray.filter(user => user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                user.lastName.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
            ).slice(0, 5)
        }
    },
})