import Button from '@mui/material/Button'
import { FC } from 'react'

export const TaxTableButtonRemoveRow: FC<{
  callback: (key: string, value: string | number) => void
  id: number
}> = ({ id, callback }) => {
  return (
    <Button
      onClick={(e) => {
        if (e) {
          callback('delete', id)
        }
      }}
      variant="outlined"
    >
      {' '}
      Delete row {id}
    </Button>
  )
}
