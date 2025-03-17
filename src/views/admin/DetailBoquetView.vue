<template>
    <div>
        <section>
            <div class="bg-stone-200 p-4 flex flex-col gap-y-2">
                <div class="h-48 sm:h-72">
                    <img src="https://placehold.co/600x400" alt="image-product" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-row items-center gap-2 justify-between">
                    <div class="h-18 w-18 sm:w-40 sm:h-32">
                        <img src="https://placehold.co/600x400" alt="image-product" class="w-full h-full object-cover">
                    </div>
                    <div class="h-18 w-18 sm:w-40 sm:h-32">
                        <img src="https://placehold.co/600x400" alt="image-product" class="w-full h-full object-cover">
                    </div>
                    <div class="h-18 w-18 sm:w-40 sm:h-32">
                        <img src="https://placehold.co/600x400" alt="image-product" class="w-full h-full object-cover">
                    </div>
                    <div class="h-18 w-18 sm:w-40 sm:h-32">
                        <img src="https://placehold.co/600x400" alt="image-product" class="w-full h-full object-cover">
                    </div>
                </div>
            </div>
        </section>
        <section>
            <form action="" class="flex flex-col gap-y-3">
                <div>
                    <label for="bname">Bouquet name</label>
                    <input type="text" id="bname" name="bname" class="input w-full">
                </div>
                <div class="flex flex-row gap-x-2">
                    <div class="w-full">
                        <label for="">Bouquet price</label>
                        <input type="number" class="input w-full">
                    </div>
                    <div class="w-full">
                        <label for="">Bouquet stock</label>
                        <input type="number" class="input w-full">
                    </div>
                </div>
                <div>
                    <label for="">Category</label>
                    <select class="select w-full">
                    <option disabled selected>Pick a color</option>
                    <option>Crimson</option>
                    <option>Amber</option>
                    <option>Velvet</option>
                </select>
                </div>
                <div>
                    <label for="" class="block">Description</label>
                    <textarea class="textarea w-full h-48" placeholder="Bio"></textarea>
                </div>
                <button class="btn btn-primary">Update</button>
            </form>
        </section>
    </div>
    <button>
        <RouterLink to="/admin/bouquet">
            <span><font-awesome-icon icon="fa-solid fa-arrow-left" /></span>
            <span>back</span>
        </RouterLink>
    </button>
</template>