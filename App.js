if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard, Platform, Button } from 'react-native';
import Titulo1 from './components/titulo1';
import Constants from 'expo-constants';
import Transacoes from './components/transacoes';
import Reactotron from 'reactotron-react-native';


export default function App() {

  // lista de todas transações
  const [transacoes, setTransacao] = useState([]);

  // adcionando novas transações
  const [campoDescricaoTransacao, setCampoDescricaoTransacao] = useState('');
  const [_campoValorTransacao, setValorCampoDescricaoTransacao] = useState('');
  const [_totalGastos, setTotalGasto] = useState(0.00);
  const [_saldoFinal, setSaldoFinal] = useState(0.00);
  const [_tipoTransacao, setTipoTransacao] = useState('');

  let _addTransacao;
  // let _totalGastos;


  // função para retornar o total dos gastos
  const totalGastos = () => {
    let _totalSaidas = 0;
    let _totalEntradas = 0;
    let _saldo = 0;

    // verificar se o tipo de entrada é gasto ou ganho
    transacoes.map((element) => {
      if (element.tipo == 'saida') {
        _totalSaidas += parseFloat(element.valor);
      }
      else{
        _totalEntradas += parseFloat(element.valor);
      }
      Reactotron.log('saidas', _totalSaidas);
      Reactotron.log('entradas', _totalEntradas);
    })

    // encontrar o saldo que a pessoa possui
    _saldo = _totalEntradas - _totalSaidas;
    setTotalGasto(_totalSaidas);
    setSaldoFinal(_saldo)
    Reactotron.log('totalsaidas', _totalSaidas);
    Reactotron.log('totalentradas', _totalEntradas);
  }


  // função para adcionar novas tarefas
  const adcionaTransacao = (desc, value, tpTransacao) => {

    if (desc.length > 0 && value > 0) {
      const novaTransacao = {
        id: Math.random().toString(),
        descricao: desc,
        valor: value,
        tipo: tpTransacao
      }
      setTransacao(transacoes.concat(novaTransacao));
      setCampoDescricaoTransacao('');
      setValorCampoDescricaoTransacao('');
    }
    // para remover o teclado quando apertar no botão de adcionar nova transação
    _addTransacao.blur();

  }

  const exibeVetor = () => {
    Reactotron.log('depois de set transacoes', transacoes)
  }
  // função para remover uma transação
  // recebe o id da transação através do press que vai chamar a função passando o id por parâmetro
  // pega o vetor de todas transações e filtra por aquela transação->  .filter  (este filter retorna um novo vetor)
  // todas transações que tiverem o id diferente do id recebido -> t.id !== id <- vão ser retornadas para um novo vetor
  // que vai ser passada para o setTransacao
  const apagaTransacao = (id) => {
    setTransacao(transacoes.filter((t) => t.id !== id));
    totalGastos()
  };


  // alterar a transação

  // recebe um id e uma nova descrição 
  const alteraTransacao = (id, desc) => {
    const i = transacoes.findIndex((t) => t.id == id); //percorre o vetor de transações e procura o index que tem o id passado e armazena a posiçao na constante i
    let novaListaTransacoes = [...transacoes]; //clonagem da lista de transações original ->  usando o operador spread (que é mais simples)
    novaListaTransacoes[i].descricao = desc; //substituição da descrição no posição i
    setTransacao(novaListaTransacoes); //chamada do setTransações passando a nova lista de transações
  }


  useEffect(() => {
    exibeVetor();
    totalGastos();

  }, [transacoes]);

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

          defaultValue={campoDescricaoTransacao}
          onChangeText={(campoDescricaoTransacao) => setCampoDescricaoTransacao(campoDescricaoTransacao)}

          // onSubmitEditing={() => adcionaTransacao(campoDescricaoTransacao)}
          // onBlur={Keyboard.dismiss}
          ref={(r) => (_addTransacao = r)}
        />

        <View style={styles.valor}>
          {/* valor */}
          <TextInput style={styles.campoEntradaTransacaoTexto} placeholder='Valor'
            keyboardType='numeric'
            defaultValue={_campoValorTransacao}
            onChangeText={(_campoValorTransacao) => setValorCampoDescricaoTransacao(_campoValorTransacao)}

            // onSubmitEditing={() => { adcionaTransacao(_campoValorTransacao) }}
            // onBlur={Keyboard.dismiss}
            ref={(r) => (_addTransacao = r)}
          />
          <View style={styles.tipoValor}>
            <Button style={styles.tipoValorTexto} title="Entrada" onPress={() => setTipoTransacao('entrada')}>Entrada</Button>
            <Button style={styles.tipoValorTexto} title="Saída" onPress={() => setTipoTransacao('saida')}>Saída</Button>
            <Text>{_tipoTransacao}</Text>
          </View>
        </View>
        <Button title="Adcionar Transação" onPress={() => { adcionaTransacao(campoDescricaoTransacao, parseFloat(_campoValorTransacao), _tipoTransacao); }} />

      </View>
      <View style={styles.resumo}>
        <Text style={styles.resumoTexto}>Gastos</Text>
        {/* método toFixed para retornar duas casas decimais */}
        <Text style={styles.resumoTexto}>R$ {_totalGastos.toFixed(2)}</Text>
      </View>
      <View style={styles.resumo}>
        <Text style={styles.resumoTexto}>Saldo</Text>
        <Text style={styles.resumoTexto}>R$ {_saldoFinal.toFixed(2)}</Text>
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

  },
  valor: {
    flexDirection: 'row'
  },
  tipoValor: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#01B7D4'
  },
  tipoValorTexto: {
    alignItems: 'center',
    textAlign: 'center'
  }
});