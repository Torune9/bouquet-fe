import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import ForgotPasswordView from "@/views/auth/ForgotPasswordView.vue";
import ProfileView from "@/views/user/ProfileView.vue";
import ListOrderView from "@/views/user/ListOrderView.vue";
import ProfileInfoView from "@/views/user/ProfileInfoView.vue";
import ProfileAddressView from "@/views/user/ProfileAddressView.vue";

export const userRoutes = [
    {
        path: "/sign-in",
        name: "login",
        meta : {
            isNotAuth : true
        },
        component: LoginView,
    },
    {
        path: "/sign-up",
        name: "register",
        meta : {
            isNotAuth : true
        },
        component: RegisterView,
    },
    {
        path: "/forgot-password",
        name: "forgot password",
        component: ForgotPasswordView,
    },
    {
        path: "/profile",
        name: "profile",
        component: ProfileView,
        meta : {
            requireAuth : true,
        },
        children: [
            {
                path: "",
                name : 'childProfile',
                components: {
                    profileInfo: ProfileInfoView,
                    profileAddress: ProfileAddressView,
                },
            },
        ],
    },
    {
        path: "/order-list",
        name: "history",
        meta : {
            requireAuth : true,
        },
        component: ListOrderView,
    },
];
