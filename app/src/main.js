// arquivo inicial da aplicação

//importando as dependências
import Vue from 'vue'
import App from './App'

//renderizando a aplicação
new Vue({
    render: h => h(App)
}).$mount("#app")