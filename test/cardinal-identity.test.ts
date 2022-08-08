import { getIdentity } from '../src/cardinal-identity'
import { PublicKey } from '@solana/web3.js'

/**
 * Get Identity Test
 */
describe('Get Identity Test ', () => {
  it('should return identity', async () => {
    const testPublicKey = new PublicKey('3c5mtZ9PpGu3hj1W1a13Hie1CAXKnRyj2xruNxwWcWTz')
    const response = await getIdentity(testPublicKey)
    console.log(response)
    expect(response).toBeDefined()
  })
})
