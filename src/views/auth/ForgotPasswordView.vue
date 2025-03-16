<template>
    <section>
        <div class="w-full h-screen flex flex-col justify-center items-center p-4">
            <form action="" class="p-6 flex flex-col gap-y-4 rounded-md bg-base-300 w-full">
                <h1 class="text-start text-2xl">Forgot password</h1>
                <div>
                    <label for="" class="block">
                        Email
                    </label>
                    <input type="email" class="input sm:w-sm md:w-md lg:w-lg focus:outline-0 w-full"
                        placeholder="bouquet@mail.com">
                </div>
                <button class="btn btn-neutral w-40">
                    send
                </button>
                <RouterLink to="/sign-in">
                    <font-awesome-icon icon="fa-solid fa-arrow-left" /> <span>Back</span>
                </RouterLink>
            </form>
        </div>
    </section>
</template>