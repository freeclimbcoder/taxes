import { colors, createTheme } from '@mui/material'

import shadows from './shadows'
import typography from './typography'

const theme = createTheme({
  palette: {
    background: {
      default: '#f4f6f8',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: '#5664d2'
    },
    error: {
      main: '#d32f2f'
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f4f6f8',
          height: '100%',
          width: '100%',
          fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
        },
        a: {
          textDecoration: 'none'
        },
        '#root': {
          height: '100%',
          width: '100%'
        },
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0
        },
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          height: '100%',
          width: '100%'
        }
      }
    }
  },
  shadows,
  typography
})

export default theme
