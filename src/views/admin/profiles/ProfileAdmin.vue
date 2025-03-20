<template>
    <section>
        <div class="flex flex-row shadow-md items-center gap-x-4 bg-white rounded-md p-4">
            <div class="avatar">
                <div class="w-24 rounded-full">
                    <img src="https://placehold.co/400" alt="profile-image">
                </div>
            </div>
            <div class="flex flex-col gap-y-2 text-sm">
                <h1>Username : admin </h1>
                <h1>Email : admin@mail.com</h1>
            </div>
        </div>
        <div class="flex flex-col bg-white rounded-md p-4 mt-3 gap-y-4 shadow-md">
            <h1 class="border-b py-2">Personal information</h1>
            <form action="" class="inline-flex flex-wrap gap-x-6 w-full gap-y-2 items-center justify-between">
               <div class="flex flex-col gap-y-2">
                    <h2 class="text-slate-800">Firstname</h2>
                    <p class="text-sm text-slate-500">Jhon</p>
               </div>
               <div class="flex flex-col gap-y-2">
                    <h2 class="text-slate-800">Last Name</h2>
                    <p class="text-sm text-slate-500">Doe</p>
               </div>
               <div class="flex flex-col gap-y-2">
                    <h2 class="text-slate-800">Email</h2>
                    <p class="text-sm text-slate-500">Jhon@mail.com</p>
               </div>
               <div class="flex flex-col gap-y-2">
                    <h2 class="text-slate-800">Phone Number</h2>
                    <p class="text-sm text-slate-500">+72 999-000-77</p>
               </div>
            </form>
        </div>
    </section>
</template>