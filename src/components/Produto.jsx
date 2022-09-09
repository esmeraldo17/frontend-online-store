import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById, getItem, setItem } from '../services/api';

class Produto extends Component {
  state = {
    produto: {},

  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const fetchProduts = async () => {
      const response = await getProductById(id);
      this.setState({ produto: response });
    };
    fetchProduts();
  }

  addStorage = (obj) => {
    const sendItem = getItem('produtos') || [];
    setItem('produtos', [...sendItem, obj]);
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/cart');
  };

  render() {
    const { produto } = this.state;
    return (
      <div>
        <h4 data-testid="product-detail-name">{ produto.title }</h4>
        <img
          src={ produto.thumbnail }
          alt={ produto.name }
          data-testid="product-detail-image"
        />
        <h5 data-testid="product-detail-price">{ produto.price }</h5>
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.handleClick }
        >
          Carrinho de Compra
        </button>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addStorage(produto) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

Produto.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Produto;
