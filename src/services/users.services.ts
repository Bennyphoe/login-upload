import { CreateUserDto } from "../models/users/dtos/createUserDto"

import pool from './db'

async function getAllUsers() {
  const [rows] = await pool.query(`SELECT * from users`)
  return rows 
}

async function getUser(id: number) {
  const [rows] = await pool.query(`SELECT * from users WHERE id = ?`, [id])
  return rows[0]
}

async function createUser(createUserDto: CreateUserDto) {
  const {name, username, password} = createUserDto
  const [result] = await pool.query(
    `INSERT INTO users(name, username, password) VALUES(?, ?, ?)`, [name, username, password],
  )
  return await getUser(result.insertId)
}

export default {
  createUser,
  getUser,
  getAllUsers
}