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

```
module.exports = {
  env: {
    es6: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
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
    'react/jsx-filename-extension': ['warn', {extensions: ['.jsx', '.js']}],
    'import/prefer-default-export': 'off',
  },
};

```

8. Criamos um arquivo '.prettierrc' para resolver problema de regras duplicadas entre o ESlint e o Prettier na raiz do projeto

```
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

9. No arquivo 'settings.json' do VSCode inserimos as configurações abaixo

```
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
