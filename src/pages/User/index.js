import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styled';

export default class User extends Component {
  /**
   * Para conseguimos acessar as propriedades que vem do 'navigation'
   * precisamos transformar o 'navigationOptions' numa funcão
   * que retorna um objeto, e partir dele acessar os dados desejados
   */
  // Para retorna um objeto sempre coloca
  // um parentese por volta da função, caso contrario
  // se deixarmos só as chaves ela vai achar que é o corpo da função

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  constructor(props) {
    super(props);
    this.state = {
      stars: [],
      loading: true,
      page: 1,
      refreshing: false,
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const { page } = this.state;

    const response = await api.get(`users/${user.login}/starred?${page}`);

    this.setState({ stars: response.data, loading: false });
  }

  load = async () => {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const { page, stars } = this.state;

    const response = await api.get(`users/${user.login}/starred`, {
      params: { page },
    });
    // console.tron.log(response.data);
    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      refreshing: false,
    });
  };

  loadMore = async () => {
    const { page } = this.state;
    await this.setState({ page: page + 1 });
    this.load();
  };

  refreshList = async () => {
    await this.setState({ refreshing: true, stars: [], page: 1 });
    this.load();
  };

  handleNavigate = repository => {
    const { navigation } = this.props;
    navigation.navigate('Repository', { repository });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <ActivityIndicator color="#7157c1" size={50} marginTop={50} />
        ) : (
          <Stars
            data={stars}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
            onEndReached={this.loadMore} // Função que carrega mais itens
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};
