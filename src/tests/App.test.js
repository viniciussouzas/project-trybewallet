import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes do componente Login', () => {
  const emailTest = 'xablau@xablau.com';
  const passwordTest = '123456';

  test('Testa se os elementos do componente Login são renderizados na tela', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const passwordInput = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('Testa se comportamento do botão é disabled caso o email seja inválido e senha válida', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const passwordInput = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailInput, 'xablau');
    userEvent.type(passwordInput, passwordTest);

    expect(button).toBeDisabled();
  });

  test('Testa se comportamento do botão é disabled caso o email seja válido e senha inválida', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const passwordInput = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, '123');

    expect(button).toBeDisabled();
  });

  test('Testa o comportamento do botão caso o email e senha sejam válidos', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const passwordInput = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, passwordTest);

    expect(emailInput.value).toBe(emailTest);
    expect(passwordInput.value).toBe(passwordTest);
    expect(button).not.toBeDisabled();
  });

  test('Testa se ao clicar no botão "Entrar" a página é redirecionada para a rota "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const passwordInput = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, passwordTest);

    expect(emailInput.value).toBe(emailTest);
    expect(passwordInput.value).toBe(passwordTest);

    userEvent.click(button);

    const { pathname } = history.location;

    expect(pathname).toBe('/carteira');
  });
});

describe('Testes do componente Wallet', () => {
  const emailTest = 'xablau@xablau.com';

  test('Testa se o email digitado no componente Login é renderizado no Header de Wallet, assim como os demais elementos', () => {
    const initialEntries = ['/carteira'];
    const initialState = { user: { email: emailTest } };

    renderWithRouterAndRedux(<App />, { initialState, initialEntries });

    const userEmail = screen.getByRole('heading', {
      level: 3,
      name: emailTest,
    });
    const totalExpenses = screen.getByRole('heading', {
      level: 3,
      name: /despesa total: r\$/i,
    });
    const valueInput = screen.getByRole('spinbutton', {
      name: /valor:/i,
    });
    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    const currencyInput = screen.getByRole('combobox', {
      name: /moeda:/i,
    });
    const methodInput = screen.getByRole('combobox', {
      name: /método de pagamento:/i,
    });
    const tagInput = screen.getByRole('combobox', {
      name: /tag:/i,
    });
    const addExpenseButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(userEmail).toBeInTheDocument();
    expect(totalExpenses).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(addExpenseButton).toBeInTheDocument();
  });

  test('Testa se o valor da despesa total é atualizado ao adicionar uma nova despesa', () => {
    const initialState = {
      wallet: {
        currencies: ['USD'],
        expenses: [{
          value: '10',
          currency: 'USD',
          exchangeRates: {
            USD: {
              ask: '4.907',
            },
          },
        }],
      },
    };

    const initialEntries = ['/carteira'];

    renderWithRouterAndRedux(<App />, { initialEntries, initialState });

    const totalExpenses = screen.getByRole('heading', {
      level: 3,
      name: /despesa total: r\$/i,
    });

    expect(totalExpenses).toBeInTheDocument();
    expect(totalExpenses).toHaveTextContent('49.07');
  });

  test('Testa se os inputs de "Moeda", "Método de Pagamento", "Tag", possuem os valores específicos ao serem renderizados', () => {
    const initialEntries = ['/carteira'];

    renderWithRouterAndRedux(<App />, { initialEntries });

    const methodInput = screen.getByRole('combobox', {
      name: /método de pagamento:/i,
    });
    const tagInput = screen.getByRole('combobox', {
      name: /tag:/i,
    });

    expect(methodInput).toHaveDisplayValue('Dinheiro');
    expect(tagInput).toHaveDisplayValue('Alimentação');
  });
});
