import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue'
import ProfileView from '@/views/user/ProfileView.vue'
import ListOrderView from '@/views/user/ListOrderView.vue'

export const userRoutes = [
    {
        path : '/sign-in',
        name : 'login',
        component : LoginView
      },
      {
        path : '/sign-up',
        name : 'register',
        component : RegisterView
      },
      {
        path : '/forgot-password',
        name : 'forgot password',
        component : ForgotPasswordView
      },
      {
        path : '/profile',
        name : 'profile',
        component : ProfileView
      },
      {
        path : '/order-list',
        name : 'history',
        component : ListOrderView
      },
]

