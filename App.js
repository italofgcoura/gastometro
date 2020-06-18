import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard, Platform, Button } from 'react-native';
import Titulo1 from './components/titulo1';
import Constants from 'expo-constants';
import Transacoes from './components/transacoes';



export default function App() {

  // lista de todas transações
  const [transacoes, setTransacao] = useState([]);

  // adcionando novas transações
  const [campoTransacao, setCampoTransacao] = useState('');
  const [campoValorTransacao, setValorCampoTransacao] = useState('');
  const [_totalGastos, setTotalGasto] = useState(0.00);

  let _addTransacao;
  // let _totalGastos;

  // função para retornar o total dos gastos
  const totalGastos = () => {
    let _totalGastos = 0;
    transacoes.map((element) => {
      _totalGastos += parseFloat(element.valor);
      console.log('total', _totalGastos);
    })
    setTotalGasto(_totalGastos);
  }


  // função para adcionar novas tarefas
  const adcionaTransacao = (desc, value) => {

    if (desc.length > 0 && value > 0) {
      const novaTransacao = {
        id: Math.random().toString(),
        descricao: desc,
        valor: value,
      }

      setTransacao([...transacoes, novaTransacao]);
      setCampoTransacao('');
      setValorCampoTransacao('');

    }
    // para remover o teclado quando apertar no botão de adcionar nova transação
    _addTransacao.blur();

  }

  const exibeVetor = () => {
    console.log('depois de set transacoes', transacoes)

  }
  // função para remover uma transação
  // recebe o id da transação através do press que vai chamar a função passando o id por parâmetro
  // pega o vetor de todas transações e filtra por aquela transação->  .filter  (este filter retorna um novo vetor)
  // todas transações que tiverem o id diferente do id recebido -> t.id !== id <- vão ser retornadas para um novo vetor
  // que vai ser passada para o setTransacao
  const apagaTransacao = (id) => {
    console.log(id);
    setTransacao(transacoes.filter((t) => t.id !== id))
  };


  // alterar a transação

  // recebe um id e uma nova descrição 
  const alteraTransacao = (id, desc) => {
    const i = transacoes.findIndex((t) => t.id == id); //percorre o vetor de transações e procura o index que tem o id passado e armazena a posiçao na constante i
    let novaListaTransacoes = [...transacoes]; //clonagem da lista de transações original ->  usando o operador spread (que é mais simples)
    novaListaTransacoes[i].descricao = desc; //substituição da descrição no posição i
    setTransacao(novaListaTransacoes); //chamada do setTransações passando a nova lista de transações
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.out}>
      <View style={styles.tituloApp}>
        <Titulo1>Gastômetro</Titulo1>
        <Titulo1>9000</Titulo1>
      </View>

      {/* chamada do componente para exibição das transações, passando a lista de transações como parâmetro */}
      {/* passagem dos métodos de apagar e alterar tarefa para os subcompnente */}
      <Transacoes list={transacoes} onAltera={alteraTransacao} onApaga={apagaTransacao} />
      {/* campo para entrada de nova transação*/}
      <View styles={styles.campoEntradaTransacao}>

        {/* descrição */}
        <TextInput style={styles.campoEntradaTransacaoTexto} placeholder='Nova transação'

          defaultValue={campoTransacao}
          onChangeText={(campoTransacao) => setCampoTransacao(campoTransacao)}

          onSubmitEditing={() => adcionaTransacao(campoTransacao)}
          // onBlur={Keyboard.dismiss}
          ref={(r) => (_addTransacao = r)}
        />

        {/* valor */}
        <TextInput style={styles.campoEntradaTransacaoTexto} placeholder='Valor'
          keyboardType='numeric'
          defaultValue={campoValorTransacao}
          onChangeText={(campoValorTransacao) => setValorCampoTransacao(campoValorTransacao)}

          onSubmitEditing={() => { adcionaTransacao(campoValorTransacao) }}
          // onBlur={Keyboard.dismiss}
          ref={(r) => (_addTransacao = r)}
        />

        <Button title="Adcionar Transação" onPress={() => { adcionaTransacao(campoTransacao, parseFloat(campoValorTransacao)); totalGastos(); exibeVetor() }} />

      </View>
      <View style={styles.resumo}>
        <Text style={styles.resumoTexto}>Gastos</Text>
        {/* método toFixed para retornar duas casas decimais */}
        <Text style={styles.resumoTexto}>R$ {_totalGastos.toFixed(2)}</Text>
      </View>
      <View style={styles.resumo}>
        <Text style={styles.resumoTexto}>Saldo</Text>
        <Text style={styles.resumoTexto}>R$ 0,00</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  out: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight,
  },
  tituloApp: {
    backgroundColor: '#01B7D4',
    padding: 15,
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resumo: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  resumoTexto: {
    color: '#01B7D4',
    fontSize: 24,
    padding: 15,
    fontWeight: 'bold'
  },
  campoEntradaTransacao: {
    flexDirection: 'row',
    margin: 15,
    height: 40,
  },
  campoEntradaTransacaoTexto: {
    fontSize: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#01B7D4',
    backgroundColor: 'white',
    marginTop: 1
  }
});