import axios from 'axios'

export function apiBase(dev?: boolean): string {
  return `https://${dev ? 'dev-api' : 'api'}.cardinal.so`
}

export async function tryGetImageUrl(name: string, dev?: boolean): Promise<string | undefined> {
  try {
    const response = await axios.get(
      `${apiBase(
        dev
      )}/namespaces/twitter/proxy?url=https://api.twitter.com/2/users/by&usernames=${name}&user.fields=profile_image_url`
    )
    const json = response.data as {
      data: { profile_image_url: string }[]
    }
    return json?.data[0]?.profile_image_url.replace('_normal', '')
  } catch (e) {
    console.log(e)
    return undefined
  }
}
