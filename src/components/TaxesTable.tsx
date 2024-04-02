import { Button, Table, TableBody } from '@mui/material'
import moment from 'moment'
import { FC, useEffect, useState } from 'react'
import { taxesGet, taxesService } from 'services/taxesService'
import { currencyTax } from 'services/taxesService'

import TaxTableRow from './TaxTableRow'

type taxRow = {
  id: number
  currency: string
  date: string
  amount: number
  laryAmount: number
  rowRate: number
}

const defaultDate = new Date()
defaultDate.setDate(1)
defaultDate.setMonth(defaultDate.getMonth() - 1)
const TaxesTable: FC = () => {
  const [rows, setRows] = useState([] as taxRow[])
  const [currencies, setCurrencies] = useState(
    {} as {
      [key: string]: taxesGet
    }
  )

  //const [amountOnDate : number[], setAmountOnDate] = useState(0)
  const getCurrencies = async (date: string) => {
    console.log(date, currencies[date])
    if (!currencies[date]) {
      try {
        currencies[date] = await taxesService.get({ date })
        setCurrencies(currencies)
      } catch (e) {
        console.log('тут происходит алерт ебат')
      }
    }
    return currencies[date]
  }

  const addNewRow = async () => {
    const defaultAmount = 100
    const defaultDate = new Date()
    defaultDate.setDate(1)
    defaultDate.setMonth(defaultDate.getMonth() - 1)
    const rates = await getCurrencies(moment(defaultDate).format('YYYY-MM-DD'))

    const currentRate = rates.currencies.find(
      (e: currencyTax) => e.code == 'USD'
    )
    if (currentRate) {
      const newRow = {
        id: rows.length ? rows[0].id + 1 : 1,
        currency: 'USD',
        date: moment(defaultDate).format('YYYY-MM-DD'),
        amount: defaultAmount,
        laryAmount: defaultAmount * currentRate.rate,
        rowRate: currentRate.rate
      }
      setRows([newRow, ...rows])
    }
  }

  const calculateLaryAmount = () => {
    return (
      rows.map((e) => e.laryAmount).reduce((a, b) => a + b, 0) + 0.005
    ).toFixed(2)
  }

  const callback = async (id: number, key: string, value: number | string) => {
    const currentRow = rows.find((e) => e.id == id)
    console.log('callback taxtable', id, key, value)

    if (currentRow) {
      if (key == 'amount') {
        currentRow.amount = value as number
      }
      if (key == 'currency') {
        currentRow.currency = value as string
      }
      if (key == 'date') {
        currentRow.date = value as string
      }
      if (key == 'delete') {
        console.log('remove row with id ', value)
        rows.splice(rows.indexOf(currentRow), 1)
      }

      const rates = await getCurrencies(currentRow.date)
      const currentRate = rates.currencies.find(
        (e: currencyTax) => e.code == currentRow.currency
      )
      if (currentRate) {
        currentRow.laryAmount =
          (currentRow.amount * currentRate.rate) / currentRate.quantity
        currentRow.rowRate = currentRate.rate
      } //@todo надо что-то сделать если не нашло. Ну мало ли какой-то сбой у этих ебланов на бэке. Выкидывать там ошибку или чё, добавть пруфы данных
      //@todo Добавить копирование суммы по клику,
      //@todo Добавить мультиязычность

      setRows([...rows])
    }
  }

  useEffect(() => {
    addNewRow()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(currencies)
  return (
    <>
      <Button onClick={addNewRow} variant="outlined">
        Add new row
      </Button>
      <Table size="small">
        <TableBody>
          {rows.map((row) => (
            <TaxTableRow
              amount={row.amount}
              changeRow={callback}
              currency={row.currency}
              date={row.date}
              id={row.id}
              key={`row${row.id}`}
              rate={row.rowRate}
            />
          ))}
        </TableBody>
      </Table>
      <label
        id="result"
        onClick={() => {
          navigator.clipboard.writeText(calculateLaryAmount())
        }}
      >
        {calculateLaryAmount()} lary
      </label>
    </>
  )
}

export default TaxesTable
