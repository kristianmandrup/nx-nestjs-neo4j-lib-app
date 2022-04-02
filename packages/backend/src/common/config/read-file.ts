import * as fs from 'fs';
import * as path from "path";

const localDir = __dirname
export const distPath = (filePath) =>  path.join(localDir, filePath)

export const readFile = (filePath) => {
  const devFilePath = path.join(__dirname, '../../', filePath)
  const distFilePath = distPath(filePath)
  let resolvedFilePath = devFilePath
  if (!fs.existsSync(resolvedFilePath)) {
    throw Error(`cannot find file ${resolvedFilePath} in ${process.cwd()}`)    
    resolvedFilePath = distFilePath
  }
  return fs.readFileSync(resolvedFilePath)
}