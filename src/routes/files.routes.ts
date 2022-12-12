import express, {Request, Response, NextFunction} from 'express'
const filesRouter = express.Router()
import path from "path"

import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "uploads/")
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  }
})
const maxSize = 2 * 1024 * 1024
const upload = multer({
  storage,
  fileFilter: (req: any, file: any, cb: any) => {
    const acceptedFileTypes = ["image/jpg", "image/png", "image/jpeg"]
    if (acceptedFileTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      return cb(new Error("Only Images are allowed!"))
    }
  },
  limits: {fileSize: maxSize}
})

import filesService from '../services/files.service'
import s3 from '../services/s3'
import fs from 'fs'


filesRouter.post('/', upload.single('file'), async (req: any, res: Response, next: NextFunction) => {
  try {
    const file = req.file
    const info = req.body
    const { caption, userId, receipientId } = info
    const { filename, path } = file

    //save the info into the File entity
    const result = await s3.uploadFile(file)
    const newFile = await filesService.createFile({caption, userId, name: filename, receipientId})
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

filesRouter.get('/sent/:senderId', async(req: Request, res: Response, next: NextFunction) => {
  const senderId = req.params.senderId
  try {
    const result = await filesService.findAll(+senderId)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

filesRouter.get('/received/:receiverId', async(req: Request, res: Response, next: NextFunction) => {
  const receiverId = req.params.receiverId
  try {
    const result = await filesService.findAllReceived(+receiverId)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

export default filesRouter


