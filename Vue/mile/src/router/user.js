export default [
    {
        path: '/allUser',
        name: 'AllUser',
        component: () => import('../views/AllUserView.vue'),
        meta: { requiresAuth: true } // 인증이 필요한 라우트에 메타 필드 추가
    },
    {
        path: '/SelectUser',
        name: 'SelectUser',
        component: () => import('../views/SelectUserView.vue'),
        meta: { requiresAuth: true } // 인증이 필요한 라우트에 메타 필드 추가
    }
];
