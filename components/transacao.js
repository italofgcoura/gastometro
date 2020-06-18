import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function Transacao(props) {
    return (
        <View style={styles.itemOut}>
            <View style={styles.itemIn} key={props.id}>
                <Text style={styles.itemTexto}>{props.descricao}</Text>
                <Text style={styles.itemTexto}>{props.valor}</Text>
                <View>
                    <TouchableOpacity onPress={() => props.onApaga(props.id)}>
                        <Text style={styles.apagar}>Apagar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.editar}>Editar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemOut: {
        flex: 1,
    },
    itemTexto: {
        padding: 15,
        color: '#01B7D4',
        fontWeight: 'bold'
    },
    itemIn: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    editar: {
        backgroundColor: 'green',
        padding: 10
    },
    apagar: {
        backgroundColor: 'red',
        padding: 10
    }
})