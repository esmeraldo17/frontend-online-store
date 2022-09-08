import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Home extends Component {
  state = {
    listaVazia: true,
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/cart');
  };

  render() {
    const { listaVazia } = this.state;
    return (
      <div>
        <input type="text" />
        {
          listaVazia && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
        }
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
