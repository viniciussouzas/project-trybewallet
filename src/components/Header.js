import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{email}</h3>
        <h3>
          Despesa Total: R$
          {' '}
          <span data-testid="total-field">
            {
              (expenses.reduce((acc, expense) => {
                const { currency, exchangeRates } = expense;
                const value = Number(expense.value);
                const ask = Number(exchangeRates[currency].ask);

                return (acc + (value * ask));
              }, 0) || 0).toFixed(2)
            }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Header);
