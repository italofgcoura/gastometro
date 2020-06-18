import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Titulo1({ children }) {
  return (
    <View>
      <Text style={styles.texto}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  texto: {
    flex: 1,
    fontSize: 38,
    color: 'white'
  }
});
