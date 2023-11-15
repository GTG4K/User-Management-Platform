import {createRouter, createWebHistory} from "vue-router";

const HomeView = () => import("../views/HomeView.vue")
const UsersView = () => import("../views/UsersView.vue")
const UserView = () => import("../views/UserView.vue")

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            alias: "/",
            path: '/home',
            name: 'home',
            component: HomeView
        },
        {
            path: '/users',
            name: 'users',
            component: UsersView
        },
        {
            path: '/users/:id',
            name: 'user',
            component: UserView
        }
    ]
})

export default router