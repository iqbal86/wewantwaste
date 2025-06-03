import { createContext, useContext, useMemo, ReactNode, useState } from 'react'
import { fetchSkips } from '../services/api'
import { SkipApiResponseWithImageUrl } from '../types/types'
import { AxiosClient, IAxiosClient } from '../utility/AxiosClient'

type ApiContextProps = {
  fetchSkips: (
    postcode: string,
    area: string,
  ) => Promise<SkipApiResponseWithImageUrl[]>
}

const ApiContext = createContext<ApiContextProps>({} as ApiContextProps)

const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [client] = useState<IAxiosClient>(
    new AxiosClient({
      baseURL: 'https://app.wewantwaste.co.uk/api',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }),
  )

  const apiContext: ApiContextProps = useMemo(
    () => ({
      fetchSkips: async (postcode: string, area: string) =>
        fetchSkips(client, postcode, area),
    }),
    [client],
  )

  return (
    <ApiContext.Provider value={apiContext}>{children}</ApiContext.Provider>
  )
}
export const useApiContext = () => useContext(ApiContext)

export default ApiProvider
