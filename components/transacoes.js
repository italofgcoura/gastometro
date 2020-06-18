import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Transacao from './transacao'

export default function Transacoes(props) {
    
    return (
        <FlatList style={styles.container}
            data={props.list}
            renderItem={({ item }) => (
                // passando cada item para o component de transação
                <Transacao
                    id={item.id}
                    descricao={item.descricao}
                    valor={item.valor}
                    onApaga={props.onApaga}
                    onAltera={props.onAltera} />
            )}
            // uso interno do react
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separador}></View>}

        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    separador: {
        height: 1,
        backgroundColor: '#01B7D4'
    }
})