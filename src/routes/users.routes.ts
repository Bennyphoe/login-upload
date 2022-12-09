import express, {Request, Response, NextFunction} from 'express'
const router = express.Router()

import usersService from '../services/users.services'

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await usersService.getAllUsers())
    } catch(err) {
        console.log("There was an error fetching all the users!")
        next(err)
    }
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    try {
        res.json(await usersService.getUser(+id))
    } catch(err) {
        console.log(`There was an error fetching the user with id: ${id}`)
        next(err)
    }
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await usersService.createUser(req.body)
        res.status(201).json(result)
    } catch (err) {
        console.log(`there was an error creating a new user! error: ${err}`)
        next(err)
    }
})

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        const result = await usersService.updateUser(+id, req.body)
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        const result = await usersService.deleteUser(+id)
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const {username, password} = req.body
    try {
        const result = await usersService.loginUser(username, password)
        res.status(201).json(result)
    } catch(error) {
        next(error)
    }
})

module.exports = router