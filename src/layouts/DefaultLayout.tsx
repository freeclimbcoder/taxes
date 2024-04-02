import { styled } from '@mui/material'
import { Outlet } from 'react-router-dom'

const DefaultLayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%'
}))

const DefaultLayout = () => (
  <DefaultLayoutRoot>
    <Outlet />
  </DefaultLayoutRoot>
)

export default DefaultLayout
