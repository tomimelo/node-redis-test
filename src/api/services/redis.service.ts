import { redisClient } from '../server'

export const RedisService = {
  saveCount: async function (count: number) {
    const actualCount = await this.getCount()
    const newCount = actualCount + count
    await redisClient.set('count', newCount)
  },
  getCount: async function (): Promise<number> {
    const count = await redisClient.get('count') || 0
    return Number(count)
  }
}

export default RedisService
