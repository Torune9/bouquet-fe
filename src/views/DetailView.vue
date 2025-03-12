<template>
    <MainLayout>
        <template #content>
            <!-- navigation -->
            <div class="breadcrumbs text-sm p-2">
                <ul>
                    <li>
                        <RouterLink to="/bouquet">
                            Bouquet
                        </RouterLink>
                    </li>
                    <li>Documents</li>
                </ul>
            </div>
            <!-- container detail -->
            <div class="p-2 md:px-20">
                <!-- detail sub-container -->
                <div class="flex flex-col gap-y-2">
                    <!-- image wrapper -->
                    <div class="grid sm:grid-cols-[1fr_200px] gap-2 lg:h-[400px] border">
                        <!-- image hero -->
                        <div class="w-full h-60 sm:h-80 border lg:h-[400px]">
                            <img src="https://placehold.co/600x400?text=Product+Image" alt="bouquet-image"
                                class="h-full w-full object-cover">
                        </div>
                        <!-- image child -->
                        <div class="flex flex-row justify-between sm:flex-col sm:gap-2">
                            <div class="border sm:h-18 lg:h-20">
                                <img src="https://placehold.co/600x400?text=Product+Image" alt="child-image"
                                    class="h-fit w-20 sm:object-cover sm:w-full sm:h-full">
                            </div>
                            <div class="border sm:h-18 lg:h-20">
                                <img src="https://placehold.co/600x400?text=Product+Image" alt="child-image"
                                    class="h-fit w-20 sm:object-cover sm:w-full sm:h-full">
                            </div>
                            <div class="border sm:h-18 lg:h-20">
                                <img src="https://placehold.co/600x400?text=Product+Image" alt="child-image"
                                    class="h-fit w-20 sm:object-cover sm:w-full sm:h-full">
                            </div>
                            <div class="border sm:h-18 lg:h-20">
                                <img src="https://placehold.co/600x400?text=Product+Image" alt="child-image"
                                    class="h-fit w-20 sm:object-cover sm:w-full sm:h-full">
                            </div>
                        </div>
                    </div>
                    <!-- info product -->
                    <div class="flex flow-row justify-between items-center font-semibold">
                        <h1 class="text-xl">Product Name</h1>
                        <h2 class="text-lg">Rp 200.000</h2>
                    </div>
                    <!-- description -->
                    <div class="flex flex-col gap-y-4">
                        <p class="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit magnam
                            temporibus deserunt? Itaque, ipsa? Et sunt accusamus perferendis sequi corporis, inventore
                            dolorum facilis iusto aut ipsam debitis eligendi cupiditate autem soluta commodi laboriosam
                            consectetur libero delectus eum, blanditiis atque illo.</p>

                        <div class="flex flex-row justify-between items-center">
                            <p class="border px-4 rounded-md">
                                Category
                            </p>
                            <span>
                                <span class="border w-20 text-center rounded-md text-info inline-block mr-2">New</span>
                                <span class="border w-20 text-center rounded-md text-orioles-orange inline-block">Hot</span>
                            </span>
                        </div>
                    </div>
                    <!-- order btn -->
                    <div class="flex flex-row  justify-between gap-x-2 lg:justify-evenly">
                        <button class="btn btn-lg w-1/2 btn-success lg:w-52">
                            Order
                        </button>
                        <button class="btn btn-lg btn-warning w-40 lg:w-52">
                            add to cart
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex mt-4 flex-wrap gap-x-1 gap-y-4 justify-center sm:gap-x-4">
            <ProductCard v-for="bouquet in products" :id="bouquet.id" :img="bouquet.img" :name="bouquet.name" :price="bouquet.price"/>
        </div>
        </template>
    </MainLayout>
</template>

<script setup>
import ProductCard from '@/components/info/ProductCard.vue';
import MainLayout from '@/layouts/MainLayout.vue';
const products = [
  {
    id : 1,
    img: "https://placehold.co/600x400?text=Product+Image",
    name: "Buket Mawar Merah",
    price: 150000,
  },
  {
    id : 2,
    img: "https://placehold.co/600x400?text=Product+Image",
    name: "Buket Lily Elegan",
    price: 180000,
  },
  {
    id : 3,
    img: "https://placehold.co/600x400?text=Product+Image",
    name: "Buket Campuran Romantis",
    price: 200000,
  },
  {
    id : 4,
    img: "https://placehold.co/600x400?text=Product+Image",
    name: "Buket Wisuda Spesial",
    price: 170000,
  },
  {
    id : 5,
    img: "https://placehold.co/600x400?text=Product+Image",
    name: "Buket Tulip Mewah",
    price: 220000,
  }
];

</script>