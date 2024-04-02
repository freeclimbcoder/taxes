import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { FC, useState } from 'react'

const TaxTableDatePicker: FC<{
  callback: (key: string, value: string | number) => void
  value: string
}> = ({ callback }) => {
  const defaultDate = new Date()
  defaultDate.setDate(1)
  defaultDate.setMonth(defaultDate.getMonth() - 1)

  const [date, setDate] = useState(defaultDate.getTime())

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Income date"
        onChange={(date) => {
          if (date) {
            console.log('datepicker', date)
            setDate(date.unix() * 1000) //почитал доку по dayjs, как получать timestamp https://day.js.org/docs/en/display/unix-timestamp
            callback('date', date.format('YYYY-MM-DD'))
          }
          if (date === null) {
            console.log('date ', date, ' NNNNNNNUUUUUULLLLL')
          }

          console.log(date, 'kek')
          //@todo date can be null --- done
        }}
        value={dayjs(date)}
      />
    </LocalizationProvider>
  )
}

export default TaxTableDatePicker
