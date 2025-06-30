import { IAxiosClient } from 'utility/AxiosClient'
import { SkipApiResponse, SkipApiResponseWithImageUrl } from '../types/types'

const basePath = '/skips/by-location'
const SKIP_IMAGE_URL =
  'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yard-skip.jpg'

export async function fetchSkips(
  client: IAxiosClient,
  postcode: string,
  area: string,
): Promise<SkipApiResponseWithImageUrl[]> {
  const data = await client.get<SkipApiResponse[]>(
    `${basePath}?postcode=${postcode}&area=${area}`,
  )
  // Add imageUrl to each skip
  return data.map((item) => ({
    ...item,
    imageUrl: SKIP_IMAGE_URL,
  }))
}
