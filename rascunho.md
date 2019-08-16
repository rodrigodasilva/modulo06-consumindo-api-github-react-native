# Rascunho para estudo

## Criando projeto

- Iniciamos o projeto utilizando o comando 'react-native init' pois instalamos este comando de forma global no sistema, caso contrario, teriamos que utilizar 'npx react-native init', ou seja utilizamos 'npm'
- Este comando cria um projeto 'react-native-cli' que é para não utilizarmos o 'expo'

  > npx react-native init modulo06

- Inicia projeto, para iniciar o Metro Bundler'
  > react-native start
- E depois roda o projeto
  > react-native run-android

### Comandos

- Starta e reseta o cache
  > react-native start --reset-cache

### Para usar no emular no celular

- Com o usb conectado faça os passos 1 e 2, depois desconecte o usb e teste a conexão

1. Adiciona o ip do computador no celular. Ex: '192.168.0.12:8081'
2. Configure a porta no adb
   > adb kill-server
   > adb reverse tcp:8081 tcp:8081
   > adb start-server

## Notas

- Por padrão o react-native trabalha com 'display:flex' e a propriedade 'flex-direction: column'

## Configurando ESLint, Prettier e EditorConfig

1. Clicamos na raiz do projeto com o botão direito e geramos o arquivo '.editorconfig'

```
root = true

[*]
end_of_line = lf
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

2. Adicionamos a extensão do 'Eslint'

   > yarn add eslint -D

3. Rodamos o eslint
   > yarn eslint --init

3) Selecionamos as seguintes opções que vão aparecer no terminal
   3.1. How would you like to use ESLint?
   To check syntax only
   To check syntax and find problems
   ❯ To check syntax, find problems, and enforce code style

   3.2. What type of modules does your project use? (Use arrow keys)
   ❯ JavaScript modules (import/export)
   CommonJS (require/exports)
   None of these

   3.3. Which framework does your project u
   se? (Use arrow keys)
   ❯ React
   Vue.js
   None of these

   3.4. Where does your code run?
   ❯ ◯ Browser
   ◯ Node

   3.5. How would you like to define a style for your project?
   (Use arrow keys)
   ❯ Use a popular style guide
   Answer questions about your style
   Inspect your JavaScript file(s)

   3.6. Which style guide do you want to follow? (Use arrow keys)
   ❯ Airbnb (https://github.com/airbnb/javascript)
   Standard (https://github.com/standard/standard)
   Google (https://github.com/google/eslint-config-google)

   3.7. What format do you want your config file to be in? (Use arrow keys)
   ❯ JavaScript
   YAML
   JSON

4) A instalação é feita por padrão utilizando o 'npm', o que gera um arquivo 'package-lock.json', mas como estamos trabalhando com o yarn, removemos este arquivo e rodamos o yarn para realizar o mapeamento das novas dependencias no 'yarn.lock'

   > yarn

5) Instalamos a extenção ESlint na IDE

6) Adicionamos as bibliotecas para integração do ESlint com o Prettier

   > yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D

7) Configuramos o arquivo '.eslintrc.js'

```js
module.exports = {
  env: {
    es6: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'import/prefer-default-export': 'off',
    'react/static-property-placement': 'enabled',
  },
};
```

8. Criamos um arquivo '.prettierrc' para resolver problema de regras duplicadas entre o ESlint e o Prettier na raiz do projeto

```js
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

9. No arquivo 'settings.json' do VSCode inserimos as configurações abaixo

```js
"eslint.autoFixOnSave": true,
"eslint.validate": [
  {
    "language": "javascript",
    "autoFix": true
  },
  {
    "language": "javascriptreact",
    "autoFix": true
  }
],
```

10. Dá um fix em todos os arquivos '.js' na pasta 'src'
    > yarn eslint --fix src --ext .js

## Configurando Reactotron

- Ferramenta de debug

1. Baixamos a ferramenta no site e instalamos no sistema
2. Adicionamos o pacote ao projeto
   > yarn add reactotron-react-native
3. Criamos uma pasta 'src' na raiz do projeto, e nela uma pasta 'config' com o arquivo 'ReactotronConfig.js'

```js
import Reactotron from 'reactotron-react-native';

//  _DEV_ - variavel global do react-native que retorna 'true'
//  quando o usuario esta emulando sua aplicação em ambiente de desenvolvimento

if (__DEV__) {
  // host: endereco do computador
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
```

4. Importamos no arquivo desejado e toda vez que realizarmos um 'console.tron.log()' ele vai aparecer na timeline do reactotron

## React Navigation

- Criamos um arquivo 'routes.js' na pasta 'src'
- Importamos o modulo para navegação e junto com ele um para os gestos na tela
  > yarn add react-navigation react-native-gesture-handler
- Acessamos o arquivo 'MainActivity.java' e colamos o código abaixo

No import

```
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

```

Dentro da classe

```
@Override
protected ReactActivityDelegate createReactActivityDelegate() {
  return new ReactActivityDelegate(this, getMainComponentName()) {
    @Override
    protected ReactRootView createRootView() {
      return new RNGestureHandlerEnabledRootView(MainActivity.this);
    }
  };
}
```

- Adicionamos a biblioteca 'jetifier' para tratar uma incompatibilidade da biblioteca 'gestureHanlder'

  > yarn add jetifier -D

- Vamos até 'package.json' e adicionamos no script

```
"postinstall": "npx jetify"
```

- E rodamos o 'yarn' para atualizar as depencias
- Apos isso o app novamente, pois fizemos uma alteração nativa, por isso precisamos reinstalar o app

### Metodos utilizados para as rotas

- createAppContainer: é como se fosse o browserRouter do reactJS, ele contem as configurações pro nosso roteamento funcionar. Ele precisa sempre estar por volta das rotas
- createStackNavigator: contem um tipo de configuração de rotas

## Styled Components

- Adiciona a dependência
  > yarn add styled-components
- Cria arquivos separados para estilizar os componentes
- A grande diferença do 'Styled-Component' no react-native para o reactJS, esta na importação, onde devemos usar o 'native' no final, e na chamada do componente que se deseja estilizar no 'styled', pois não temos componentes como 'div, h1, h2' e sim 'Text, View' etc

```js
import styled from 'styled-components/native';

export const Main = styled.View``;
```

### OBS:

- No react-native não conseguimos utilzar o encadeamento para estilizar elemento dentro de outro elemento. Todo componente que precisarmos estilizar tem que ter um styled-component separado
- Também não conseguimos definir estilos globais para a nossa aplicação

## Estilizando formulário

- Adicionamos uma biblioteca para trabalharmos com icones

  > yarn add react-native-vector-icons

- Cria o link com o codigo nativo
  > react-native link react-native-vector-icons
- Roda o yarn para atualizar as depedências
  > yarn
- Iniciamos novamente o app para que ele possa carregar as alterações nativas
  > react-native run-android

## Salvando no storage

- Adicionamos uma biblioteca que serve como banco de dados local
  > yarn add @react-native-community/async-storage
- Fazermos o linkin dessa biblioteca
  > react-native link @react-native-community/async-storage
- Iniciamos o app novamente
  > react-native run-android

## Realizando navegação

- Adicionamos a dependencia 'prop-types' para realizarmos a validação das propriedades
  > yarn add prop-types
