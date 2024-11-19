import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Eğer Vue Router kullanıyorsanız
import store from "./store"; // Eğer Vuex veya Pinia kullanıyorsanız
// Uygulamayı oluştur ve gerekli eklentileri bağla
const app = createApp(App);

// Vue Router ekle
app.use(router);

// Vuex veya Pinia ekle (isteğe bağlı)
app.use(store);

// Uygulamayı bağla
app.mount("#app");
