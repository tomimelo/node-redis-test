import supertest from 'supertest'
import Server, { redisClient } from '../../../src/api/server'

const server = new Server(3000)
const api = supertest(server.getApp())

describe('Count routes', () => {
  beforeAll(async () => {
    await redisClient.connect()
  })

  afterAll(async () => {
    await redisClient.disconnect()
  })

  test('Should get count', async () => {
    const response = await api.get('/api/count').expect(200)
    expect(response.body.count).toBe(11)
  })
})
