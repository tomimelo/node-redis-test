import supertest from 'supertest'
import Server, { redisClient } from '../../../src/api/server'
import path from 'path'
import { promises as fs } from 'fs'

import FileService from '../../../src/api/services/file.service'

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

  describe('Track route', () => {
    const TEST_FILE_PATH = path.join(__dirname, '../../../data/data_test.json')

    beforeAll(async () => {
      jest.spyOn(FileService, 'getFilePath').mockReturnValue(TEST_FILE_PATH)
    })

    beforeEach(async () => {
      await fs.unlink(TEST_FILE_PATH).catch(() => {})
    })

    test("Should create data file if it doesn't exist", async () => {
      await api.post('/api/track').send({}).expect(200)
      const fileExists = await FileService.fileExists()
      expect(fileExists).toBe(true)
      await fs.unlink(TEST_FILE_PATH)
    })

    test('Should save data in data file', async () => {
      const body = { name: 'test', value: 'test' }
      const response = await api.post('/api/track').send(body).expect(200)
      expect(response.body.msg).toBe('Data tracked successfully')
      const fileData = await fs.readFile(TEST_FILE_PATH, 'utf8')
      const expectedData = JSON.stringify([body])
      expect(fileData).toBe(expectedData)
    })

    test('Should append data in data file', async () => {
      const testData = [
        { name: 'test', value: 'test' },
        { name: 'test2', value: 'test2' },
        { name: 'test3', value: 'test3' }
      ]

      await testData.reduce(async (acc: any, data) => {
        const actualBody = await acc
        const response = await api.post('/api/track').send(data).expect(200)
        expect(response.body.msg).toBe('Data tracked successfully')
        const fileData = await fs.readFile(TEST_FILE_PATH, 'utf8')
        actualBody.push(data)
        const expectedData = JSON.stringify(actualBody)
        expect(fileData).toBe(expectedData)
        return actualBody
      }, Promise.resolve([]))
    })

    test('Should save count data if count key exists', async () => {
      await redisClient.set('count', 0)

      const expectedCount = 5
      const body = { name: 'test', value: 'test', count: expectedCount }

      const response = await api.post('/api/track').send(body).expect(200)
      expect(response.body.msg).toBe('Data tracked successfully')

      const countResponse = await api.get('/api/count').expect(200)
      expect(countResponse.body.count).toBe(expectedCount)
    })

    afterAll(async () => {
      await fs.unlink(TEST_FILE_PATH).catch(() => {})
    })
  })
})
