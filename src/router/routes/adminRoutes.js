import AdminLayout from "@/layouts/AdminLayout.vue";
import BouquetView from "@/views/admin/BouquetView.vue";
import CategoryView from "@/views/admin/CategoryView.vue";
import DashboardView from "@/views/admin/DashboardView.vue";
import OrderView from "@/views/admin/OrderView.vue";
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