import { useOrderStore } from "@/stores/orderStore";
import { toast } from "vue3-toastify";

export const openSnap = (token, router, id) => {
    const orderStore = useOrderStore();
    window.snap.pay(token, {
        onSuccess: async function (result) { 
            toast.success("payment success!", {
                onClose: () => router.replace("/order-list"),
            });

            try {
                const response = await orderStore.updateStatus(orderStore.orderId);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        onPending: function (result) {
            toast.warning("wating your payment!", {
                onClose: () => router.replace("/order-list"),
            });
        },
        onError: async function (result) {
            toast.error("payment failed!");
            try {
                const response = await orderStore.updateStatus(id);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        onClose: function () {
            toast.info("you closed the popup without finishing the payment", {
                onClose: () => router.replace("/order-list"),
            });
        },
    });
};
