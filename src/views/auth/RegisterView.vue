<template>
    <section>
        <div class="w-full h-screen flex flex-col lg:flex-row overflow-hidden">
            <div class="p-8 flex items-center flex-col gap-y-2 lg:w-1/2 justify-center h-full">
                <h1 class="text-4xl text-start md:w-lg sm:w-sm w-full">Sign up</h1>
                <form action="" class="flex flex-col items-center md:w-lg sm:w-sm w-full">
                    <fieldset class="fieldset w-full">
                        <legend class="fieldset-legend">Username</legend>
                        <input type="text" class="input w-full" placeholder="Type here" />
                        <p class="fieldset-label">Optional</p>
                    </fieldset>
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
                    <button
                        class="btn btn-primary w-full">
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
</script>
