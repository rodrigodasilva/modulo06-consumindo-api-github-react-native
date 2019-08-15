import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7159c1',
  },

  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to react-native</Text>
    </View>
  );
}
