import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Categorias extends Component {
  state = {
    listaCategoria: [],
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({
      listaCategoria: categories,
    });
  }

  render() {
    const { listaCategoria } = this.state;
    return (
      <div>
        {
          listaCategoria.map((e) => (
            <button
              type="button"
              data-testid="category"
              key={ e.id }
            >
              {e.name}
            </button>
          ))
        }
      </div>
    );
  }
}

export default Categorias;
