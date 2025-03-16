import NotFoundView from '@/views/NotFoundView.vue'

export const notFoundRoutes = [
    {
        path: "/:pathMatch(.*)*",
        component: NotFoundView,
    },
];
