const API_URL = import.meta.env.VITE_API_URL

interface Request {
  method: string
  headers: Headers
  body?: any // eslint-disable-line
}

interface Body {
  logout?: boolean
  data?: any // eslint-disable-line
  jwt?: string
  message?: string
}

interface ClientResponse {
  body?: Body
  headers?: object
}

interface ClientInput {
  path: string
  headers?: HeadersInit
  data?: any // eslint-disable-line
  getParams?: object
}

const addJWT = (headers: Headers) => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    headers.set('Authorization', jwt)
  }
}

const addDefaultHeaders = (headers: Headers) => {
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')
}

const addGetParams = (props: ClientInput) => {
  const params: { [key: string]: any } = { ...props.getParams } // eslint-disable-line
  const getParams = Object.keys(params)
    .map((key) => (params[key] ? `${key}=${params[key]}` : false))
    .filter((e) => e)
  if (getParams.length) {
    props.path += `?${getParams.join('&')}`
  }
}

const clientRequest = async (
  path: string,
  request: Request
): Promise<ClientResponse> => {
  const response = await fetch(`${API_URL}/${path}`, request as RequestInit)

  const clientResponse: ClientResponse = {}
  if (response.status === 403) {
    return clientResponse
  }
  if (response.status !== 204) {
    const body = (await response.json()) as Body
    if (body.jwt) {
      localStorage.setItem('jwt', body.jwt)
    }
    if (body.logout) {
      localStorage.removeItem('jwt')
      //document.location.reload()
    }
    clientResponse.body = body
  }
  return clientResponse
}

export const HttpClient = {
  async get(props: ClientInput): Promise<ClientResponse> {
    const headers: HeadersInit = new Headers()
    addJWT(headers)
    addDefaultHeaders(headers)

    const request: Request = {
      method: 'GET',
      headers
    }

    addGetParams(props)

    const clientResponse = await clientRequest(props.path, request)
    return clientResponse
  },
  async delete(props: ClientInput): Promise<ClientResponse> {
    const headers: HeadersInit = new Headers()
    addJWT(headers)
    addDefaultHeaders(headers)

    const request: Request = {
      method: 'DELETE',
      headers
    }

    addGetParams(props)

    const clientResponse = await clientRequest(props.path, request)
    return clientResponse
  },
  async post(props: ClientInput): Promise<ClientResponse> {
    const headers: HeadersInit = new Headers()
    addJWT(headers)
    addDefaultHeaders(headers)

    const request: Request = {
      method: 'POST',
      headers
    }

    request.body =
      request.headers.get('Content-Type') === 'application/json'
        ? JSON.stringify(props.data)
        : props.data

    addGetParams(props)

    const clientResponse = await clientRequest(props.path, request)
    return clientResponse
  },
  async put(props: ClientInput): Promise<ClientResponse> {
    const headers: HeadersInit = new Headers()
    addJWT(headers)
    addDefaultHeaders(headers)

    const request: Request = {
      method: 'PUT',
      headers
    }

    request.body =
      request.headers.get('Content-Type') === 'application/json'
        ? JSON.stringify(props.data)
        : props.data

    addGetParams(props)

    const clientResponse = await clientRequest(props.path, request)
    return clientResponse
  }
}

export interface defaultAnswer {
  status: boolean
  message?: string
}
