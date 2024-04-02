import { TableCell, TableRow } from '@mui/material'
import { FC } from 'react'

import TableCurrencySelect from './TableCurrencySelect'
import { TaxTableButtonRemoveRow } from './TaxTableButtonRemoveRow'
import TaxTableDatePicker from './TaxTableDatePicker'
import TaxTableNumberField from './TaxTableNumberInput'
import TaxTableRateField from './TaxTableRateField'

const TaxTableRow: FC<{
  date: string
  currency: string
  rate: number
  amount: number
  id: number
  changeRow: (id: number, key: string, value: number | string) => Promise<void>
}> = ({ date, currency, rate, amount, id, changeRow }) => {
  console.log(date, currency, amount, rate, id)

  const callback = (key: string, value: string | number) => {
    console.log('row callback', id, key, value, rate)
    changeRow(id, key, value)
  }

  return (
    <TableRow>
      <TableCell>
        <TaxTableButtonRemoveRow callback={callback} id={id} />
      </TableCell>
      <TableCell>
        <TaxTableRateField date={date} value={rate} />
      </TableCell>
      <TableCell>
        <TableCurrencySelect callback={callback} value={currency} />
      </TableCell>
      <TableCell>
        <TaxTableDatePicker callback={callback} value={date} />
      </TableCell>
      <TableCell>
        <TaxTableNumberField callback={callback} value={amount} />
      </TableCell>
    </TableRow>
  )
}

export default TaxTableRow
