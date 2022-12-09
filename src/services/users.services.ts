import { CreateUserDto } from "../models/users/dtos/createUserDto"
import { UpdateUserDto } from "../models/users/dtos/updateUserDto"
import { User } from "../models/users/users.entity"
import dataSource from "../app-data-source"
import { myCustomError } from "../errors/customError"

const usersRepository = dataSource.getRepository(User)
async function createUser(createUserDto: CreateUserDto) {
  const {name, username, password} = createUserDto
  const newUser = usersRepository.create({name, username, password})
  const allUsers = await getAllUsers()
  const allUsernames = allUsers.map(user => user.username)
  if (allUsernames.includes(username)) {
    throw new myCustomError(500, "Username has already been taken!")
  }
  const savedUser = await usersRepository.save(newUser)
  return savedUser
}

async function getAllUsers(): Promise<User[]> {
  const users = await usersRepository.find()
  return users
}

async function getUser(id: number): Promise<User> {
  try {
    const user = await usersRepository.findOneOrFail({
      where: {
        id
      }
    })
    return user
  } catch (error) {
    throw new myCustomError(404, `user with Id: ${id} cannot be found!`)
  }
}


async function updateUser(id: number, updateUserDto: UpdateUserDto) {
  const userToUpdate = await getUser(id)
  const keyValuePairs = Object.entries(updateUserDto)
  for (const keyValue of keyValuePairs) {
    const [key, value] = keyValue
    userToUpdate[key] = value
  }
  return await usersRepository.save(userToUpdate)
}

async function deleteUser(id: number) {
  const userToDelete = await getUser(id)
  const deletedUser = await usersRepository.remove(userToDelete)
  return {
    ...deletedUser,
    id,
  }
}

async function loginUser(username: string, password: string) {
  const user = await usersRepository.findOne({
    where: {
      username: username
    }
  })
  if (!user) {
    throw new myCustomError(404, `username: ${username} cannot be found!`)
  }
  if (user && user.password === password) {
    const {password, ...rest} = user
    return rest
  } else {
    throw new myCustomError(500, "You are not authorised!")
  }
}


export default {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser
}