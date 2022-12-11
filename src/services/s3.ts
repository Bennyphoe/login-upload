import S3 from 'aws-sdk/clients/s3'
require("dotenv").config()
import fs from 'fs'

const bucketName = process.env.AWS_BUCKET_NAME as string
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

//upload a file to S3
function uploadFile(file: any) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}

function getFile(key: string) {
  const downloadParams = {
    Key: key,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}


//download a file from S3

export default {
  uploadFile,
  getFile
}