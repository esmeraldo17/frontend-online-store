import React, { Component } from 'react';
import Categorias from './Categorias';

class Home extends Component {
  state = {
    listaVazia: true,
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
        <Categorias />
      </div>
    );
  }
}

export default Home;
// husauhifsauhifsauhoisfauhoisfgahoi
