import { promises as fs } from 'fs'
import path from 'path'

const FILE_PATH = path.join(__dirname, '../../../data/data.json')

export const FileService = {
  getFilePath: function () {
    return FILE_PATH
  },
  saveData: async function (data: any) {
    const fileExists = await this.fileExists()
    if (!fileExists) await this.createFile()
    const fileData = await fs.readFile(this.getFilePath(), 'utf8')
    const json = JSON.parse(fileData)
    json.push(data)
    await fs.writeFile(this.getFilePath(), JSON.stringify(json))
  },
  fileExists: async function () {
    try {
      await fs.access(this.getFilePath())
      return true
    } catch (error) {
      return false
    }
  },
  createFile: async function () {
    await fs.writeFile(this.getFilePath(), '[]')
  }

}

export default FileService
