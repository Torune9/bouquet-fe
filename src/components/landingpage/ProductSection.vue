<template>
  <div class="p-2">
    <h1 class="text-center text-2xl">A Sprig of Love, a Million Meanings.</h1>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Search bouquet</legend>
      <label class="input w-full ">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        <input type="search" required placeholder="Search" />
      </label>

    </fieldset>
    <div class="mt-4">
      <small>Filter</small>
      <input type="checkbox"
        class="toggle peer ml-2 checked:bg-amber-400 checked:border-amber-600 checked:text-amber-800" />

      <div class="filter hidden peer-checked:flex mt-4 gap-y-2">
        <input class="btn filter-reset" type="radio" name="queryFilter" aria-label="All" />
        <input class="btn" name="queryFilter" type="radio" :value="filter.value" :aria-label="filter.name"
          v-for="filter in filterQuery" />
      </div>
    </div>
    <div class="flex mt-4 flex-wrap gap-x-1 gap-y-4 justify-center sm:gap-x-4">
      <ProductCard v-for="bouquet in products" :id="bouquet.id" :img="bouquet.img" :name="bouquet.name"
        :price="bouquet.price" />
    </div>
  </div>
</template>

<script setup>
import ProductCard from '../info/ProductCard.vue';

const filterQuery = [
  {
    name: 'cheap',
    value: 'priceAsc'
  },
  {
    name: 'expensive',
    value: 'priceDesc'
  },
  {
    name: 'newest',
    value: 'latest'
  },
  {
    name: 'oldest',
    value: 'oldest'
  },
  {
    name: 'latest price',
    value: 'latestPriceAsc'
  }
]

const products = [
  {
    id: 1,
    img: "https://placehold.co/600x400?text=Product+Image",
    name: "Buket Mawar Merah",
    price: 150000,
  },
  {
    id: 2,
    img: "https://placehold.co/600x400?text=Product+Image",
    name: "Buket Lily Elegan",
    price: 180000,
  },
  {
    id: 3,
    img: "https://placehold.co/600x400?text=Product+Image",
    name: "Buket Campuran Romantis",
    price: 200000,
  },
  {
    id: 4,
    img: "https://placehold.co/600x400?text=Product+Image",
    name: "Buket Wisuda Spesial",
    price: 170000,
  },
  {
    id: 5,
    img: "https://placehold.co/600x400?text=Product+Image",
    name: "Buket Tulip Mewah",
    price: 220000,
  }
];

</script>