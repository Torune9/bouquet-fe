import "./assets/css/tailwind.css";

import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import { pinia } from "./services/pinia";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import Loading from "./components/info/Loading.vue";

library.add(fas, fab, far);

const app = createApp(App);
import {
    Chart,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,LineController,LineElement,PointElement);

app.use(Vue3Toastify, {
    autoClose: 1000,
    theme: "auto",
});

app.component("EasyDataTable", Vue3EasyDataTable);
app.component("LoadingOverlay", Loading);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(pinia);
app.use(router);

app.mount("#app");
