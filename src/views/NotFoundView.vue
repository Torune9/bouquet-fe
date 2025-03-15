<template>
    <div class="h-screen w-screen flex justify-center items-center flex-col gap-y-4">
        <h1 class="text-9xl font-black">404</h1>
        <h2>Page Not Found</h2>
        <p>Oops looks like the page doesn't exist</p>
        <button>
            <RouterLink to="/bouquet" class="btn">
                Home
            </RouterLink>
        </button>
    </div>
</template>