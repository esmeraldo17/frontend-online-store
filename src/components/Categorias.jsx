import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { handleCategorie } = this.props;
    return (
      <div>
        {
          listaCategoria.map((e) => (
            <button
              type="button"
              data-testid="category"
              key={ e.id }
              onClick={ () => handleCategorie(e.id) }
            >
              {e.name}
            </button>
          ))
        }
      </div>
    );
  }
}

Categorias.propTypes = {
  handleCategorie: PropTypes.func.isRequired,
};

export default Categorias;
