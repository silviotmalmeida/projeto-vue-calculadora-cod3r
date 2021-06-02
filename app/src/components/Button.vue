<template>
  <!-- trecho de código que representa o html do componente -->
  <!-- definindo o componente button -->
  <!-- o atributo @click é responsável por escutar o evento de click padrão e emitir um novo evento de nome onClick e valor referente à label -->
  <!-- o atributo :class aplica as classes referenciadas caso tenham sido passadas na criação do componente  -->
  <button
    class="button"
    @click="$emit('onClick', label)"
    :class="{ double, triple, operation }"
  >
  <!-- o texto do botão será proveniente do valor do atributo label passado na criação do componente-->
    {{ label }}
  </button>
</template>

<script>
export default {
  // parâmetros a serem passados ao componente
  props: {
    label: {},
    operation: { type: Boolean },
    double: { type: Boolean },
    triple: { type: Boolean },
  },
};
</script>

<style>
/* trecho de código que representa o css do componente */

:root {
  --bg-button: #f0f0f0;
  --border-button: solid 1px #888;
}

.button {
  font-size: 1.4em;
  background-color: var(--bg-button);
  border: none;
  border-right: var(--border-button);
  border-bottom: var(--border-button);
  outline: none;
}

.button:active {
  background-color: #ccc;
}

.button.double {
  grid-column: span 2;
}

.button.triple {
  grid-column: span 3;
}

.button.operation {
  background-color: #fa8231;
  color: #fff;
}

.button.operation:active {
  background-color: #fa8231cc;
}
</style>
