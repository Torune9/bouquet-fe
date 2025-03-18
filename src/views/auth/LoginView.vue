<template>
    <section>
        <div class="w-full h-screen flex flex-col lg:flex-row font-archivo">
            <div class="w-full h-44 lg:w-1/2 lg:h-full">
                <img :src="img" alt="image-login" class="w-full h-full object-cover" loading="lazy">
            </div>
            <div class="p-8 flex items-center flex-col gap-y-2 lg:w-1/2 justify-center h-full">
                <h1 class="text-4xl text-start md:w-lg sm:w-sm w-full">Sign in</h1>
                <form action="" class="flex flex-col items-center md:w-lg sm:w-sm w-full" @submit.prevent="login">
                    <fieldset class="fieldset w-full">
                        <legend class="fieldset-legend">Email</legend>
                        <input type="text" class="input w-full focus:outline-0" placeholder="Type here" v-model="payload.email" />
                        <p class="fieldset-label text-red-600" v-show="v$.email.$error" v-for="error in v$.email.$errors">{{ error.$message }}
                        </p>
                    </fieldset>
                    <fieldset class="fieldset w-full">
                        <legend class="fieldset-legend">Password</legend>
                        <input type="password" class="input w-full focus:outline-0" placeholder="Type here"
                            v-model="payload.password" />
                            <p class="fieldset-label text-red-600" v-show="v$.password.$error" v-for="error in v$.password.$errors">{{ error.$message }}
                            </p>
                    </fieldset>
                    <button
                        class="btn bg-orioles-orange text-orioles-linen hover:bg-orange-500 w-full transition-colors duration-300">
                        Submit
                    </button>
                    <div class="flex flex-row justify-between mt-4 w-full">
                        <p class="text-sm">
                            Don't have an account? <span class="underline text-blue-600">
                                <RouterLink to="/sign-up">
                                    sign-up
                                </RouterLink>
                            </span>
                        </p>
                        <RouterLink class="text-sm underline" to="/forgot-password">
                            Forgot Password
                        </RouterLink>
                    </div>
                    <RouterLink to="/bouquet" class="mt-4">
                        <font-awesome-icon icon="fa-solid fa-arrow-left" /> <span>Back</span>
                    </RouterLink>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
import img from '@/assets/img/img4.jpg'
import { useAuthStore } from '@/stores/authStore'
import useVuelidate from '@vuelidate/core'
import { email, minLength, required } from '@vuelidate/validators'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

const rules = computed(() => ({
    email: {
        required,
        email
    },
    password: {
        required,
        minLength: minLength(8)
    }
}))

const payload = reactive({
    email: '',
    password: ''
})

const v$ = useVuelidate(rules.value, payload)

const authStore = useAuthStore()

const router = useRouter()


const login = async () => {
    try {
        const isFormCorrect = await v$.value.$validate()

        if (!isFormCorrect) return

        const response = await authStore.login(payload)

        return router.push({
            name : 'bouquet'
        })

    } catch (error) {
        return error
    }
}
</script>
