import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }
    
  html,
  body {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.secondary};
    width: 100%;
    height: 100%;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    border: none;
  }

    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
    -webkit-text-fill-color: ${({ theme }) => theme.secondary};
    transition: background-color 5000s ease-in-out 0s;
  }
`

export const darkTheme = {
  primary: '#2c353c',
  secondary: '#dadada',
  secondaryActive: '#fafafa',
  warning: '#FF6361',
  success: '#70AD7B',
  scrollHover: '#bababa',
  modalBg: '#0000003a',
  inputBg: '',
  modifyButton: '#4299e1',
  modifyButtonBorder: '#2b6cb0'
}

export const lightTheme = {
  primary: '#dadada',
  secondary: '#2c2c2c',
  secondaryActive: '#000',
  warning: '#cc0000',
  success: '#198754',
  scrollHover: '#5a5a5a',
  modalBg: '#ffffff3a',
  inputBg: '',
  modifyButton: '#17a2b8',
  modifyButtonBorder: '#138496'
}
