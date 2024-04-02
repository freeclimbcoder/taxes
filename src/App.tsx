import { CssBaseline, ThemeProvider } from '@mui/material'
import { useRoutes } from 'react-router-dom'
import RoutesList from 'routes/RoutesList'
import theme from 'theme'

const App = () => {
  const routing = useRoutes(RoutesList)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  )
}

export default App
