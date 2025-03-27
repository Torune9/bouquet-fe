<template>
    <section>
        <div class="w-full h-screen flex flex-col lg:flex-row overflow-hidden font-archivo">
            <div class="p-8 flex items-center flex-col gap-y-2 lg:w-1/2 justify-center h-full">
                <h1 class="text-4xl text-start md:w-lg sm:w-sm w-full">Sign up</h1>
                <form @submit.prevent="register" class="flex flex-col items-center md:w-lg sm:w-sm w-full">
                    <fieldset class="fieldset w-full">
                        <legend class="fieldset-legend">Username</legend>
                        <input type="text" class="input w-full focus:outline-0" placeholder="Type here"
                            v-model="payload.username" />
                        <p class="fieldset-label text-red-500" v-show="v$.username.$error"
                            v-for="error of v$.username.$errors">
                            {{ error.$message }}
                        </p>
                    </fieldset>
                    <fieldset class="fieldset w-full">
                        <legend class="fieldset-legend">Email</legend>
                        <input type="text" class="input w-full focus:outline-0" placeholder="Type here"
                            v-model="payload.email" />
                        <p class="fieldset-label text-red-500" v-show="v$.email.$error"
                            v-for="error of v$.email.$errors">
                            {{ error.$message }}
                        </p>
                    </fieldset>
                    <fieldset class="fieldset w-full">
                        <legend class="fieldset-legend">Password</legend>
                        <input type="password" class="input w-full focus:outline-0" placeholder="Type here"
                            v-model="payload.password" />
                        <p class="fieldset-label text-red-500" v-show="v$.password.$error"
                            v-for="error of v$.password.$errors">
                            {{ error.$message }}
                        </p>
                    </fieldset>
                    <button class="btn btn-primary w-full">
                        Submit
                    </button>
                    <div class="flex flex-row justify-between mt-4 w-full">
                        <p class="text-sm">
                            Already have an account? <span class="underline text-blue-600">
                                <RouterLink to="/sign-in">
                                    sign-in
                                </RouterLink>
                            </span>
                        </p>
                    </div>
                </form>
            </div>
            <div class="w-full h-60 lg:w-1/2 lg:h-full">
                <img :src="img" alt="image-login" class="w-full h-full object-cover" loading="lazy">
            </div>
        </div>
    </section>
</template>

<script setup>
import img from '@/assets/img/img4.jpg'
import useVuelidate from '@vuelidate/core';
import { computed, reactive } from 'vue';
import { required, email, minLength } from '@vuelidate/validators';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()

const rules = computed(() => ({
    username: {
        required
    },
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
    username: '',
    email: '',
    password: ''
})
const v$ = useVuelidate(rules.value, payload)

const router = useRouter()

const register = async () => {
    try {
        const isFormCorrect = await v$.value.$validate()
        if (!isFormCorrect) return

        payload.email = ''
        payload.username = ''
        payload.password = ''

        const response = await authStore.register(payload)

        return router.replace({
                path: '/sign-n',
                state: {
                    isSuccess: true
                }
            })
    } catch (error) {
        if (error.status == 409) {
            toast.warning('email already exist')
        } else {
            toast.error(error)
        }
    }
}

</script>
