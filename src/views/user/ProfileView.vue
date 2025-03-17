<template>
    <MainLayout>
        <template #content>
            <div
                class="grid grid-cols-1 grid-rows-[auto_1fr] w-full p-4 lg:px-28  md:px-24 sm:px-16 lg:grid-cols-[300px_1fr] lg:gap-4">
                <div
                    class="grid grid-cols-[120px_1fr] grid-rows-[1fr_auto] max-md:justify-center gap-2 lg:gap-4 lg:flex lg:flex-col lg:p-4 lg:items-center p-2 h-fit shadow">
                    <div class="w-24 h-24 lg:w-40 lg:h-40 rounded-full overflow-hidden max-md:justify-self-center">
                        <img :src="img" alt="" class="w-full h-full object-cover">
                    </div>
                    <div class="flex flex-col gap-y-4 justify-center w-full text-xs sm:text-lg">
                        <div>
                            <p>
                                <span class="w-16 sm:w-24 inline-flex justify-between">
                                    Username
                                    <span>:</span>
                                </span>&nbsp;Jhondoe
                            </p>
                            <p>
                                <span class="w-16 sm:w-24 inline-flex justify-between">
                                    Email
                                    <span>:</span>
                                </span>&nbsp;jhondoe@gmail.com
                            </p>
                            <p>
                                <span class="w-16 sm:w-24 inline-flex justify-between">
                                    Phone
                                    <span>:</span>
                                </span>&nbsp;+72 888-9998-0000
                            </p>
                        </div>
                        <ul class="text-xs font-light">
                            <li>
                                Adress Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, cum?
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Infomation -->
                <div class="flex flex-col ">
                    <h1 class="text-xl mb-2 border-b py-2">Your information</h1>
                    <form action="" class="flex flex-col gap-y-2">
                        <div>
                            <label for="uname">Username</label>
                            <input type="text" class="input w-full" id="uname" name="uname">
                        </div>
                        <div>
                            <label for="email">Email</label>
                            <input type="email" class="input w-full" id="email" name="email">
                        </div>
                        <div class="inline-flex gap-x-3 w-full">
                            <div class="w-full">
                                <label for="fname">First Name</label>
                                <input type="text" class="input w-full" id="fname" name="fname">
                            </div>
                            <div class="w-full">
                                <label for="lname">Last Name</label>
                                <input type="text" class="input w-full" id="lname" name="fname">
                            </div>
                        </div>
                        <button class="btn w-full">Update</button>
                    </form>
                    <form action="#" class="inline-flex items-center mt-8 w-full gap-x-2">
                        <div class="relative w-full">
                            <label for="address" class="absolute bottom-10">Address</label>
                            <input type="text" class="input w-full" id="address" name="address">
                        </div>
                        <button class="btn">add</button>
                    </form>
                    <h1 class="mt-2 p-2 text-lg border-b">Your address</h1>
                    <!-- <ul> sekarang akan mengisi sisa ruang -->
                    <ul class="overflow-y-auto flex-grow min-h-0">
                        <li class="border-b py-2 inline-flex justify-between items-center w-full">
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium doloremque aliquam
                                eum? Perferendis fuga sit nemo minima architecto ratione! Itaque eos, voluptatem magnam
                                dicta suscipit harum error necessitatibus vitae ipsum, aliquam sint velit, sapiente vel
                                ipsam repellendus atque nesciunt labore?
                            </p>
                            <button class="btn btn-ghost btn-circle">
                                <font-awesome-icon icon="fa-solid fa-xmark" />
                            </button>
                        </li>
                        <li class="border-b py-2 inline-flex justify-between items-center w-full">
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium doloremque aliquam
                                eum? Perferendis fuga sit nemo minima architecto ratione! Itaque eos, voluptatem magnam
                                dicta suscipit harum error necessitatibus vitae ipsum, aliquam sint velit, sapiente vel
                                ipsam repellendus atque nesciunt labore?
                            </p>
                            <button class="btn btn-ghost btn-circle">
                                <font-awesome-icon icon="fa-solid fa-xmark" />
                            </button>
                        </li>
                        <li class="border-b py-2 inline-flex justify-between items-center w-full">
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium doloremque aliquam
                                eum? Perferendis fuga sit nemo minima architecto ratione! Itaque eos, voluptatem magnam
                                dicta suscipit harum error necessitatibus vitae ipsum, aliquam sint velit, sapiente vel
                                ipsam repellendus atque nesciunt labore?
                            </p>
                            <button class="btn btn-ghost btn-circle">
                                <font-awesome-icon icon="fa-solid fa-xmark" />
                            </button>
                        </li>
                        <li class="border-b py-2 inline-flex justify-between items-center w-full">
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium doloremque aliquam
                                eum? Perferendis fuga sit nemo minima architecto ratione! Itaque eos, voluptatem magnam
                                dicta suscipit harum error necessitatibus vitae ipsum, aliquam sint velit, sapiente vel
                                ipsam repellendus atque nesciunt labore?
                            </p>
                            <button class="btn btn-ghost btn-circle">
                                <font-awesome-icon icon="fa-solid fa-xmark" />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </template>
    </MainLayout>
    <section>
    </section>
</template>

<script setup>
import img from '@/assets/img/profile.jpg'
import MainLayout from '@/layouts/MainLayout.vue';
</script>
