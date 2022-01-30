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

  const methods = ['get', 'post', 'put', 'delete']
  methods.forEach(method => {
    test(`Should not found undefined ${method.toUpperCase()} route`, async () => {
      const route = '/api/not-found'
      const res = await (api as any)[method](route).expect(404)
      expect(res.body?.error?.status).toBe(404)
      expect(res.body?.error?.message).toBe(`${method.toUpperCase()} ${route} not found`)
    })
  })

  describe('Count route', () => {
    const randomNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1)
    randomNumbers.forEach(count => {
      test(`Should get count = ${count}`, async () => {
        await redisClient.set('count', count)
        const response = await api.get('/api/count').expect(200)
        expect(response.body.count).toBe(count)
      })
    })

    test('Should get count = 0 if key count does not exist', async () => {
      await redisClient.del('count')
      const response = await api.get('/api/count').expect(200)
      expect(response.body.count).toBe(0)
    })
  })
})
