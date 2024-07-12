
export default [
    {
        path: '/allUser',
        name: 'AllUser',
        component: () => import('../views/AllUserView.vue')
    },
    {
        path: '/SelectUser',
        name: 'selectUser',
        component: () => import('../views/SelectUserView.vue')
    }
];