import AdminLayout from "@/layouts/AdminLayout.vue";
import AddBouquetView from "@/views/admin/bouquets/AddBouquetView.vue";
import BouquetView from "@/views/admin/bouquets/BouquetView.vue";
import CategoryView from "@/views/admin/categories/CategoryView.vue";
import DashboardView from "@/views/admin/DashboardView.vue";
import DetailBoquetView from "@/views/admin/bouquets/DetailBoquetView.vue";
import OrderView from "@/views/admin/OrderView.vue";
import ProfileAdmin from "@/views/admin/profiles/ProfileAdmin.vue";
import RoleView from "@/views/admin/RoleView.vue";
import UserListView from "@/views/admin/UserListView.vue";

export const adminRoutes = [
    {
        path : '/admin',
        name : 'admin',
        component : AdminLayout,
        redirect : '/admin/dashboard',
        children : [
            {
                path : 'dashboard',
                name : 'dashboard',
                component : DashboardView
            },
            {
                path : 'category',
                name : 'categories',
                component : CategoryView
            },
            {
                path : 'bouquet',
                name : 'boqouets',
                component : BouquetView
            },
            {
                path: "bouquet/add",
                name: "add-bouquet",
                component: AddBouquetView,
            },
            {
                path : 'bouquet/:id',
                name : 'boqouet-detail',
                component : DetailBoquetView
            },
            {
                path: "profile",
                name: "profile-admin",
                component: ProfileAdmin,
            },
            {
                path : 'order',
                name : 'order-list',
                component : OrderView
            },
            {
                path : 'user',
                name : 'user-list',
                component : UserListView
            },
            {
                path : 'role',
                name : 'roles',
                component : RoleView
            },
        ]
    }
]