import dataSource from "../app-data-source";
import { myCustomError } from "../errors/customError";
import { CreateFileDto } from "../models/files/dtos/createFileDto";
import { File } from "../models/files/files.entity";
import usersServices from "./users.services";
const filesRepository = dataSource.getRepository(File)

async function createFile(createFileDto: CreateFileDto) {
    const {caption, userId, name} = createFileDto
    console.log(userId)
    const user = await usersServices.getUser(userId)
    const newFile = filesRepository.create({
        caption,
        date: new Date(),
        user,
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
      userId
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
  deleteFile
}