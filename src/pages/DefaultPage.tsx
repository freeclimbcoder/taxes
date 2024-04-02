import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material'
import moment from 'moment/moment'
import { FC, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { taxesService } from 'services/taxesService'

//import AlertProvider from '../components/AlertProvider'
import TaxesTable from '../components/TaxesTable'

const DefaultPage: FC = () => {
  const defaultDate = new Date()
  defaultDate.setDate(1)
  defaultDate.setMonth(defaultDate.getMonth() - 1)
  const getRates = async () => {
    const rates = await taxesService.get({
      date: moment(defaultDate).format('YYYY-MM-DD')
    })
    console.log(rates, 'DefaultPage rates')
  }

  useEffect(() => {
    getRates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Helmet>
        <title>ПЛОТИ НОЛОГИ!!!</title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: 'auto',
          width: '900px',
          height: '80%'
        }}
      >
        <Container maxWidth="md">Can stones pay taxes?</Container>
        <Container maxWidth="md">
          <Table size="medium">
            <TableBody>
              <TableRow>
                <TableCell>Currency</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Container>
        <Container maxWidth="md">
          <TaxesTable />
        </Container>
      </Box>
    </>
  )
}

export default DefaultPage
