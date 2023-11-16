import {defineStore} from "pinia";
import placeholder from "../assets/img/placeholder-image.png"
import {IUser} from "../ts/interfaces/user.interface.ts";
import {IUserState} from "../ts/interfaces/store/user.interface.ts";
import {EUserActions, EUserGetters} from "../ts/enums/store/user.enum.ts";

export const useUserStore = defineStore('users', {
    state: (): IUserState => ({
        users: {}, // Initial user state is null
        total: 0
    }),
    actions: {
        [EUserActions.setTotal](total: number) {
            this.total = total
        },
        [EUserActions.setUsers](page: number, users: IUser[]) {
            this.users[page] = users
        },
        [EUserActions.addUser](user: IUser) {
            if (!this.users[1]) this.users[1] = []
            user.image = placeholder
            this.users[1].push(user)
        },
        [EUserActions.updateUser](userID: number, user: IUser) {
            for (let page in this.users) {
                if (this.users.hasOwnProperty(page)) {
                    const currentPage = this.users[page]
                    const index = currentPage.findIndex(user => user.id === userID)
                    if (index !== -1) {
                        currentPage[index] = user
                        return
                    }
                }
            }
        },
        [EUserActions.deleteUser](userID: number) {
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
        [EUserGetters.getTotalUsers](): number {
            return this.total
        },
        [EUserGetters.getUsersByPage]: (state) => (page: number): IUser[] => {
            return state.users[page];
        },
        [EUserGetters.getUserById]: (state) => (id: number): IUser | null => {
            const usersArray = [];
            for (const key in state.users) {
                if (state.users.hasOwnProperty(key)) {
                    usersArray.push(...state.users[key]);
                }
            }
            return usersArray.find(user => user.id === id) ?? null
        },
        [EUserGetters.getUsersBySearch]: (state) => (search: string) => {
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