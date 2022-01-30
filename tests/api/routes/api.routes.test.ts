import supertest from 'supertest'
import Server, { redisClient } from '../../../src/api/server'

const server = new Server(3000)
const api = supertest(server.getApp())

describe('API routes', () => {
  beforeAll(async () => {
    await redisClient.connect()
  })

  afterAll(async () => {
    await redisClient.disconnect()
  })

  const randomNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1)
  randomNumbers.forEach(async (count) => {
    test(`Should get count = ${count}`, async () => {
      await redisClient.set('count', count)
      const response = await api.get('/api/count').expect(200)
      expect(response.body.count).toBe(count)
    })
  })
})
