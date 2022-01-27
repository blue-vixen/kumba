import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../pages/home-page.vue'
import about from '../pages/about.vue'
import stayApp from '../pages/stay-app.vue'
import stayDetails from '../pages/stay-details.vue'
import logIn from '../pages/log-in.vue'
import becomeHost from '../pages/host.vue'
import help from '../pages/help.vue'
import userMessages from '../pages/user-messages.vue'
import userNotifications from '../pages/user-notifications.vue'
import userTrips from '../pages/user-trips.vue'
import userWishList from '../pages/user-wishlist.vue'
import hostDashboard from '../pages/host-dashboard.vue'
import userAccount from '../pages/user-account.vue'
import confirmAndPay from '../pages/confirm-and-pay.vue'
import congratsPage from '../pages/congrats-page.vue'
import chat from '../pages/chat.vue'



Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: homePage
},
{
    path: '/about',
    name: 'About',
    component: about
},
{
    path: '/explore',
    name: 'Explore',
    component: stayApp
},
{
    path: '/stay/:stayId',
    name: 'stay',
    component: stayDetails
},
{
    path: '/login',
    name: 'Login',
    component: logIn
},
{
    path: '/host',
    name: 'Host',
    component: becomeHost
},
{
    path: '/help',
    name: 'help',
    component: help
},
{
    path: '/messages',
    name: 'User-messages',
    component: userMessages
},
{
    path: '/notifications',
    name: 'User-notifications',
    component: userNotifications
},
{
    path: '/trips',
    name: 'User-trips',
    component: userTrips
},
{
    path: '/wishlist',
    name: 'User-wishlist',
    component: userWishList
},
{
    path: '/dashboard',
    name: 'Host-dashboard',
    component: hostDashboard
},
{
    path: '/account',
    name: 'User-account',
    component: userAccount
},
{
    path: '/order-confirm/:orderId',
    name: 'confirm',
    component: confirmAndPay
},
{
    path: '/congrats/',
    name: 'congratsPage',
    component: congratsPage
},
{
    path: '/chat',
    name: 'chat',
    component: chat
},



]

export const router = new VueRouter({
    routes,
    scrollBehavior: function (to, from, savedPosition) {
        if (to.hash) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ selector: to.hash })
                }, 300)
            })
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ x: 0, y: 0 })
            }, 300)
        })
    },
})

export default router