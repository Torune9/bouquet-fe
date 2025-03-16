<template>
    <section>
        <div class="w-full h-screen flex flex-col lg:flex-row">
            <div class="w-full h-44 lg:w-1/2 lg:h-full">
                <img :src="img" alt="image-login" class="w-full h-full object-cover" loading="lazy">
            </div>
            <div class="p-8 flex items-center flex-col gap-y-2 lg:w-1/2 justify-center h-full">
                <h1 class="text-4xl text-start md:w-lg sm:w-sm w-full">Sign in</h1>
                <form action="" class="flex flex-col items-center md:w-lg sm:w-sm w-full">
                    <fieldset class="fieldset w-full">
                        <legend class="fieldset-legend">Email</legend>
                        <input type="text" class="input w-full" placeholder="Type here" />
                        <p class="fieldset-label">Optional</p>
                    </fieldset>
                    <fieldset class="fieldset w-full">
                        <legend class="fieldset-legend">Password</legend>
                        <input type="password" class="input w-full" placeholder="Type here" />
                        <p class="fieldset-label">Optional</p>
                    </fieldset>
                    <button class="btn bg-orioles-orange text-orioles-linen hover:bg-orange-500 w-full transition-colors duration-300">
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
                            Forget Password
                        </RouterLink>
                    </div>
                    <RouterLink to="/bouquet" class="mt-4">
                        <font-awesome-icon icon="fa-solid fa-arrow-left"/> <span>Back</span>
                    </RouterLink>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
import img from '@/assets/img/img4.jpg'
</script>
