import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { breakName, findNamespaceId, tryGetName } from '@cardinal/namespaces'
import { tryGetImageUrl } from './utils'

const TWITTER_NAMESPACE_NAME = 'twitter'

interface Identity {
  username: string | undefined
  displayImage: string | undefined
}

async function getIdentity(address: PublicKey): Promise<Identity | undefined> {
  try {
    const connection = new Connection(clusterApiUrl('mainnet-beta'))
    const [namespaceId] = await findNamespaceId(TWITTER_NAMESPACE_NAME)
    const displayNames = await tryGetName(connection, address, namespaceId)
    if (!displayNames) return
    const [_, handle] = displayNames ? breakName(displayNames[0]) : []
    if (!handle) return
    const imageUrl = await tryGetImageUrl(handle)
    if (!imageUrl) return
    return {
      username: handle,
      displayImage: imageUrl
    }
  } catch (e) {
    throw new Error(e)
  }
}

export { getIdentity, Identity }
