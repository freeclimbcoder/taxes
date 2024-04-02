import { FC } from 'react'

const TaxTableFirstRow: FC = () => {
  return (
    <tr>
      <th>Валюта</th>
      <th>Дата</th>
      <th>
        Сумма
        <button id="+" name="+">
          +
        </button>
        <button id="-" name="-">
          -
        </button>
      </th>
    </tr>
  )
}

export default TaxTableFirstRow
