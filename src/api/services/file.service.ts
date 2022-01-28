import { promises as fs } from 'fs'
import path from 'path'

const FILE_PATH = path.join(__dirname, '../../../data/data.json')

export const FileService = {
  saveData: async function (data: any) {
    const fileExists = await this.fileExists()
    if (!fileExists) await this.createFile()
    const fileData = await fs.readFile(FILE_PATH, 'utf8')
    const json = JSON.parse(fileData)
    json.push(data)
    await fs.writeFile(FILE_PATH, JSON.stringify(json))
  },
  fileExists: async function () {
    try {
      await fs.access(FILE_PATH)
      return true
    } catch (error) {
      return false
    }
  },
  createFile: async function () {
    await fs.writeFile(FILE_PATH, '[]')
  }

}

export default FileService
