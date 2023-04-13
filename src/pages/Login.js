import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions/index';

const MIN_PASSWORD_LENGTH = 6;
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(({
      [name]: value,
    }));
  };

  handleClickLogin = (e) => {
    e.preventDefault();

    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(addEmail(email));

    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;

    const isValid = validEmail.test(email) && password.length >= MIN_PASSWORD_LENGTH;

    return (
      <div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.onInputChange }
              data-testid="email-input"
              placeholder="Insira seu e-mail"
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              id="password"
              type="password"
              name="password"
              value={ password }
              onChange={ this.onInputChange }
              data-testid="password-input"
              placeholder="Insira sua senha"
            />
          </label>
          <button
            type="button"
            disabled={ !isValid }
            onClick={ this.handleClickLogin }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
