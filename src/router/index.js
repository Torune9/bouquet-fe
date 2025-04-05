import { createRouter, createWebHistory } from "vue-router";

import { userRoutes } from "./routes/userRoutes";
import { bouquetRoutes } from "./routes/bouquetRoutes";
import { homeRoutes } from "./routes/homeRoutes";
import { notFoundRoutes } from "./routes/notFoundRoutes";
import { adminRoutes } from "./routes/adminRoutes";

import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...homeRoutes,
        ...adminRoutes,
        ...userRoutes,
        ...bouquetRoutes,
        ...notFoundRoutes,
    ],
});

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();

    if (to.meta.requireAuth && !auth.isAuthenticated) {
        if (to.name !== "login") {
            next({ name: "login" });
        } else {
            next();
        }
    } else if (to.meta.isNotAuth && auth.isAuthenticated) {
        if (to.name !== "bouquet") {
            next({ name: "bouquet" });
        } else {
            next();
        }
    } else if (to.meta.role == "admin" && auth.currentUser.role.name == "user") {
        next({
            name: "bouquet",
        });
    } else {
        next();
    }
});

export default router;
