import express, {Request, Response, NextFunction} from 'express'
const filesRouter = express.Router()

import multer from 'multer'
const upload = multer({ dest: 'uploads/'})

import filesService from '../services/files.service'
import s3 from '../services/s3'
import fs from 'fs'


filesRouter.post('/', upload.single('file'), async (req: any, res: Response, next: NextFunction) => {
  try {
    const file = req.file
    const info = req.body
    const { caption, userId } = info
    const { filename, path } = file

    //apply filter?
    //resize?
    //save the info into the File entity
    const result = await s3.uploadFile(file)
    const newFile = await filesService.createFile({caption, userId, name: filename})
    fs.unlinkSync(path)
    res.status(201).json({...newFile, key: result.Key})
  } catch (error) {
    next(error)
  }
})

filesRouter.get('/:key', (req: Request, res: Response) => {
  const key = req.params.key
  const readStream = s3.getFile(key)

  readStream.pipe(res)
})

export default filesRouter


