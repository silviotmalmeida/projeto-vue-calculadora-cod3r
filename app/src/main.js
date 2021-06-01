// arquivo inicial da aplicação

//importando as dependências
import Vue from "vue";
import App from "./App";

//renderizando a aplicação
new Vue({
  // renderiza o componente raiz
  render: (h) => h(App),

  // na div app do index.html
}).$mount("#app");
