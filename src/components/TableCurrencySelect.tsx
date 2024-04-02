import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { FC, useState } from 'react'

const TableCurrencySelect: FC<{
  callback: (key: string, value: string | number) => void
  value: string
}> = ({ callback }) => {
  const [currency, setCurrency] = useState('USD')

  const handleChange = (e: SelectChangeEvent) => {
    callback('currency', e.target.value as string)

    setCurrency(e.target.value as string)

    console.log(
      'callback Currency',
      e.target.value as string,
      'currency',
      currency
    )
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="currency-select-label">Currency</InputLabel>
      <Select
        id="currency-select"
        label="Currency"
        labelId="currency-select-label"
        onChange={handleChange}
        value={currency}
      >
        <MenuItem value="USD">USD</MenuItem>
        <MenuItem value="EUR">EUR</MenuItem>
        <MenuItem value="RUB">RUB</MenuItem>
      </Select>
    </FormControl>
  )
}

export default TableCurrencySelect
