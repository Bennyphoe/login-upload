import dataSource from "../app-data-source";
import { myCustomError } from "../errors/customError";
import { CreateFileDto } from "../models/files/dtos/createFileDto";
import { File } from "../models/files/files.entity";
import usersServices from "./users.services";
const filesRepository = dataSource.getRepository(File)

async function createFile(createFileDto: CreateFileDto) {
    const {caption, userId, name, receipientId} = createFileDto
    const sender = await usersServices.getUser(userId)
    const receipient = await usersServices.getUser(receipientId) 
    const newFile = filesRepository.create({
        caption,
        date: new Date(),
        sender,
        receiver: receipient,
        name
    })
    return filesRepository.save(newFile)
}

async function findOne(id: number) {
  try {
    return await filesRepository.findOneOrFail({
        where: {
            id
        }
    })
  } catch(error) {
    throw new myCustomError(404, `file with id: ${id} cannont be found!`)
  }
}

async function findAll(userId: number) {
  return await filesRepository.find({
    where: {
      senderId: userId
    }
  })
}

async function findAllReceived(receiverId: number) {
  return await filesRepository.find({
    where: {
      receiverId
    }
  })
}

async function deleteFile(id: number) {
  const fileToBeDeleted = await findOne(id)
  return await filesRepository.remove(fileToBeDeleted)
}

export default {
  findOne,
  findAll,
  createFile,
  deleteFile,
  findAllReceived
}