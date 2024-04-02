import { HttpClient } from 'services/HttpClient'

const serviceRoot = 'json/'

export type currencyTax = {
  code: string
  quantity: number
  rateFormated: number
  rate: number
}
export interface taxesGet {
  date: string
  currencies: [currencyTax, ...currencyTax[]]
}
const taxesService = {
  async get(filters: { date: string }): Promise<taxesGet> {
    const { body } = (await HttpClient.get({
      path: `${serviceRoot}`,
      getParams: filters
    })) as { body: [taxesGet] }

    return body[0]
  }
}

export { taxesService }
