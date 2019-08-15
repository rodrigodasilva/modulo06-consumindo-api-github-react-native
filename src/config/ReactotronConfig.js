import Reactotron from 'reactotron-react-native';

//  _DEV_ - variavel global do react-native que retorna 'true'
//  quando o usuario esta emulando sua aplicação em ambiente de desenvolvimento

if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.0.12' })
    .useReactNative()
    .connect();

  /**
   * Para facilitar o acesso a configuração do reactotron
   * a atribuimos a uma nova propriedade do 'console', que é
   * uma variavel global na aplicação. Assim não precisaremos
   * fazer uma importação toda vez que quisermos chamar 'tron'
   * basta da um 'console.tron'
   */
  console.tron = tron;

  // Limpa a timeline quando damos um refresh
  tron.clear();
}
