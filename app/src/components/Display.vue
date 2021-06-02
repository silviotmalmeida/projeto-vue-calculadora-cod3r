<template>
  <!-- trecho de código que representa o html do componente -->
  <!-- definindo o componente display -->
  <div class="display">
    <!-- o texto do display será proveniente do valor do atributo value passado na criação do componente-->
    {{ value }}
  </div>
</template>

<script>
export default {
  // parâmetros a serem passados ao componente
  props: ["value"],
};
</script>

<style>
/* trecho de código que representa o css do componente */

.display {
  grid-column: span 4;
  background-color: #0004;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  font-size: 2.1em;
  overflow: hidden;
}
</style>
