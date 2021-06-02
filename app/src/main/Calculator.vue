<template>
  <!-- trecho de código que representa o html do componente -->
  <!-- definindo o componente calculator a partir da composição com outros componentes -->
  <div class="calculator">
    <Display :value="displayValue" />
    <Button label="AC" triple @onClick="clearMemory" />
    <Button label="/" operation @onClick="setOperation" />
    <Button label="7" @onClick="addDigit" />
    <Button label="8" @onClick="addDigit" />
    <Button label="9" @onClick="addDigit" />
    <Button label="*" operation @onClick="setOperation" />
    <Button label="4" @onClick="addDigit" />
    <Button label="5" @onClick="addDigit" />
    <Button label="6" @onClick="addDigit" />
    <Button label="-" operation @onClick="setOperation" />
    <Button label="1" @onClick="addDigit" />
    <Button label="2" @onClick="addDigit" />
    <Button label="3" @onClick="addDigit" />
    <Button label="+" operation @onClick="setOperation" />
    <Button label="0" double @onClick="addDigit" />
    <Button label="." @onClick="addDigit" />
    <Button label="=" operation @onClick="setOperation" />
  </div>
</template>

<script>
// importando os componentes utilizados na composição
import Button from "../components/Button";
import Display from "../components/Display";

export default {
  // função que retorna o estado inicial das variáveis do componente
  data: function() {
    return {
      //valor exibido no display
      displayValue: "0",

      //variável que armazena a necessidade de limpar o display
      clearDisplay: false,

      //operação a ser efetuada
      operation: null,

      //array com os operandos
      values: [0, 0],

      //ponteiro do array de operandos
      current: 0,
    };
  },

  // componentes utilizados na composição deste componente
  components: { Button, Display },

  // métodos do componente
  methods: {
    // método responsável por limpar a memória,
    // recarregando o estado inicial do componente
    clearMemory() {
      Object.assign(this.$data, this.$options.data());
    },

    // método responsável por realizar as operações matemáticas
    setOperation(operation) {
      //se o ponteiro do array de operandos for zero:
      if (this.current === 0) {
        //atualiza o estado do componente com a operação selecionada,
        //incrementa o ponteiro e autoriza a limpeza do display
        this.operation = operation;
        this.current = 1;
        this.clearDisplay = true;
      }

      //senão:
      else {
        //se a operação selecionada for '=', equals recebe true
        const equals = operation === "=";

        //obtendo o operador selecionado
        const currentOperation = this.operation;

        //tenta realizar a operação
        try {
          //se a operação for bem sucedida, armazena na posicao 0 do array de operandos
          this.values[0] = eval(
            `${this.values[0]} ${currentOperation} ${this.values[1]}`
          );
        } catch (e) {
          //senão, emite um evento de erro
          this.$emit("onError", e);
        }

        //zera a posição 1 do array de operandos
        this.values[1] = 0;

        //atualiza o display com o resultado da operação, convertendo para string
        this.displayValue = this.values[0].toString();

        //caso não tenha pressionado o '=', mantém a operação selecionada
        this.operation = equals ? null : operation;

        //caso não tenha pressionado o '=', incrementa o ponteiro
        //do array de operandos
        this.current = equals ? 0 : 1;

        //caso não tenha pressionado o '=', autoriza a limpeza do display
        //para a entrada do segundo operando
        this.clearDisplay = !equals;
      }
    },

    // método responsável por incluir um dígito no display
    addDigit(n) {
      //se o botão digitado for o '.' e já existir algum '.' no display:
      if (n === "." && this.displayValue.includes(".")) {
        //não inclui o dígito
        return;
      }

      //o display será limpo antes de incluir o novo dígito quando:
      //o valor atual é zero (para evitar zeros à esquerda) ou
      //a variável clear display estiver setada como true
      const clearDisplay = this.displayValue === "0" || this.clearDisplay;

      //o dígito atual só sera considerado caso clearDisplay seja false
      const currentValue = clearDisplay ? "" : this.displayValue;

      //o novo número a ser exibido será o dígito atual
      //concatenado com o novo dígito n
      const displayValue = currentValue + n;

      //atualizando o novo número no display e
      //falseando o clearDisplay no estado do componente
      this.displayValue = displayValue;
      this.clearDisplay = false;

      // Alternativa 1
      this.values[this.current] = displayValue;

      // Alternativa 2
      //se o botão digitado não for o '.':
      // if (n !== ".") {
      //obtendo o ponteiro atual do array de operandos
      //     const i = this.current
      //convertendo o número atual do display para float
      //     const newValue = parseFloat(displayValue)
      //populando a posição do ponteiro no array de operandos
      //     this.values[i] = newValue
      // }
    },
  },
};
</script>

<style>
/* trecho de código que representa o css do componente */

.calculator {
  height: 320px;
  width: 235px;
  border-radius: 5px;
  overflow: hidden;

  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: 1fr 48px 48px 48px 48px 48px;
}
</style>
