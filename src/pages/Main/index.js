import React from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

export default function Main() {
  return <View />;
}

// 'navigationOptions' é uma propriedade que o react-navigation
// busca automaticamente em cada rota para setar algumas configurações

Main.navigationOptions = {
  title: 'Usuário',
};
