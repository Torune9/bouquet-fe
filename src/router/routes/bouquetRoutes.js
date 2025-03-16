import MainPageView from '@/views/mainPage/MainPageView.vue'
import DetailView from '@/views/mainPage/DetailView.vue'

export const bouquetRoutes = [
    {
        path: "/bouquet",
        name: "bouquet",
        component: MainPageView,
    },
    {
        path: "/bouquet/:id",
        name: "detail-bouquet",
        component: DetailView,
    },
];
