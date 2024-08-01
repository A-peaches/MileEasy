export default [
  {
    path: '/mileageRequesList',
    name: 'mileageRequesList',
    component: () => import('../views/MileageRequest/MileageRequesList.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/mileageRequestWrite',
    name: 'mileageRequestWrite',
    component: () => import('../views/MileageRequest/MileageRequestWrite.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/mileageRequesDetail/:requestNo',
    name: 'mileageRequesDetail',
    component: () => import('../views/MileageRequest/MileageRequestDetail.vue'),
    meta: { requiresAuth: true },
  },
];
