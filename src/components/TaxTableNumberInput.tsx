import { TextField } from '@mui/material'
import { FC } from 'react'

export const TaxTableNumberField: FC<{
  callback: (key: string, value: string | number) => void
  value: number
}> = ({ value, callback }) => {
  return (
    <TextField
      fullWidth
      label={'Amount'}
      onChange={(e) => {
        const newValue = parseInt(e.target.value, 10) || 0

        callback('amount', newValue)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          console.log('Enter')
        }
      }}
      value={value}
      variant="outlined"
    />
  )
}

export default TaxTableNumberField
