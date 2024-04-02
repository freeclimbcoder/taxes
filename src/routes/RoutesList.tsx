import DefaultLayout from 'layouts/DefaultLayout'
import DefaultPage from 'pages/DefaultPage'

const routes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <DefaultPage /> },
      { path: '*', element: <DefaultPage /> }
    ]
  }
]

export default routes
