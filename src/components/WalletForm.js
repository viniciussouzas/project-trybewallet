import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpenseThunk, fetchCurrencyThunk } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchCurrencyThunk());
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(({
      [name]: value,
    }));
  };

  handleClickExpense = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;

    this.setState((previousState) => ({
      id: previousState.id + 1,
    }));

    dispatch(addExpenseThunk(this.state));

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies } = this.props;

    const { value, currency, method, tag, description } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              type="number"
              name="value"
              value={ value }
              onChange={ this.onInputChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              type="text"
              name="description"
              value={ description }
              onChange={ this.onInputChange }
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.onInputChange }
            >
              {
                currencies
                  .map((curr, index) => <option key={ index }>{curr}</option>)
              }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              id="method"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.onInputChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              id="tag"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.onInputChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClickExpense }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
