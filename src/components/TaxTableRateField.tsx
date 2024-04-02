import { TextField } from '@mui/material'
import { FC } from 'react'

export const TaxTableRateField: FC<{
  value: string | number
  date: string
}> = ({ value, date }) => {
  return (
    <>
      <TextField
        contentEditable={false}
        fullWidth
        label={'Current rate'}
        onClick={() => {
          navigator.clipboard.writeText(value.toString())
        }}
        value={value}
        variant="outlined"
      />

      <a
        href={`https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en//json/?date=${date}`}
      >
        check the rate source
      </a>
    </>
  )
}

export default TaxTableRateField
