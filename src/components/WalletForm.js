import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencyThunk } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchCurrencyThunk());
  }

  render() {
    const { currencies } = this.props;

    return (
      <div>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input type="number" data-testid="value-input" />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input type="text" data-testid="description-input" />
          </label>
          <label htmlFor="currency-input">
            <select data-testid="currency-input">
              {
                currencies
                  .map((currency, index) => <option key={ index }>{currency}</option>)
              }
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento:
            <select data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            <select data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
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
