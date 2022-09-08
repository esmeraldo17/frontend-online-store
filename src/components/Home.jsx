import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Categorias from './Categorias';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    lista: [],
    busca: '',
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/cart');
  };

  inputClick = async (e) => {
    const regXp = /\d+/gi;
    const test = regXp.test(e);
    let retornoApi = '';
    if (test) {
      retornoApi = await getProductsFromCategoryAndQuery(e);
    } else {
      retornoApi = await getProductsFromCategoryAndQuery('', e);
    }
    this.setState({
      lista: retornoApi.results,
    });
  };

  render() {
    const { lista, busca } = this.state;
    return (
      <div>
        <input
          type="text"
          value={ busca }
          data-testid="query-input"
          onChange={ ({ target: { value } }) => this.setState({
            busca: value,
          }) }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ () => this.inputClick(busca) }
        >
          Buscar
        </button>
        {
          lista.length === 0 && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
        }
        {
          lista.length === 0
            ? <p>Nenhum produto foi encontrado</p>
            : (
              lista.map((e) => (
                <div key={ e.id } data-testid="product">
                  <p>{e.title}</p>
                  <p>{e.price}</p>
                  <img src={ e.thumbnail } alt={ e.title } />
                </div>
              ))
            )
        }
        <Categorias />
        <input
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.handleClick }
        />
        {/* <Link to="/cart">Carrinho</Link> */}
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Home;
